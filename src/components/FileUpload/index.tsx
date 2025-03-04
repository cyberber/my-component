import React, { useState, useRef } from "react";
import message from "../Message";
import { FileChunk, UploadStatus, FileUploadProps } from "./types";
import { mockCheckFile, mockUploadChunk, mockMergeChunks } from "./utils";
import "./styles.scss";

const DEFAULT_CHUNK_SIZE = 5 * 1024 * 1024; // 5MB
const DEFAULT_MAX_SIZE = 1024 * 1024 * 1024; // 1GB

const FileUpload: React.FC<FileUploadProps> = ({
  action,
  chunkSize = DEFAULT_CHUNK_SIZE,
  maxSize = DEFAULT_MAX_SIZE,
  onSuccess,
  onError,
  onProgress,
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileChunks, setFileChunks] = useState<FileChunk[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<UploadStatus | null>(null);
  const abortController = useRef<AbortController | null>(null);

  // 计算文件hash
  const calculateHash = async (file: File): Promise<string> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result;
        if (result) {
          // 这里使用简单的hash算法，实际项目中建议使用更强的算法
          const hash = btoa(encodeURIComponent(result.toString())).slice(0, 16);
          resolve(hash);
        }
      };
      reader.readAsText(file);
    });
  };

  // 文件切片
  const createFileChunks = (file: File): FileChunk[] => {
    console.log("createFileChunks", file);
    const chunks: FileChunk[] = [];
    let start = 0;

    while (start < file.size) {
      const chunk = file.slice(start, start + chunkSize);
      chunks.push({
        chunk,
        hash: "",
        index: chunks.length,
        percentage: 0,
        size: chunk.size,
      });
      start += chunkSize;
    }

    return chunks;
  };

  // 检查文件是否已上传
  const checkFileStatus = async (
    fileHash: string
  ): Promise<UploadStatus | null> => {
    try {
      return await mockCheckFile(fileHash);
    } catch (error) {
      console.error("检查文件状态失败:", error);
      return null;
    }
  };

  // 上传单个切片
  const uploadChunk = async (
    chunk: FileChunk,
    fileHash: string,
    filename: string
  ) => {
    try {
      const response = await mockUploadChunk(chunk.chunk, chunk.hash);

      // 更新进度
      setFileChunks((prev) =>
        prev.map((item) =>
          item.index === chunk.index ? { ...item, percentage: 100 } : item
        )
      );

      return response;
    } catch (error) {
      if (error.name === "AbortError") {
        console.log("上传已取消");
        return null;
      }
      throw error;
    }
  };

  // 合并切片
  const mergeChunks = async (fileHash: string, filename: string) => {
    try {
      const data = await mockMergeChunks(fileHash, filename);
      onSuccess?.(data);
      message.success("上传成功！");
    } catch (error) {
      onError?.(error);
      message.error("合并失败！");
    }
  };

  // 处理文件选择
  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("handleFileSelect");
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > maxSize) {
      message.error(`文件大小不能超过${maxSize / 1024 / 1024}MB`);
      return;
    }

    setSelectedFile(file);
    const fileHash = await calculateHash(file);
    const status = await checkFileStatus(fileHash);

    if (status?.uploadedChunks.length === 0) {
      // 文件已上传完成，直接返回
      onSuccess?.(status);
      message.success("文件秒传成功！");
      return;
    }

    const chunks = createFileChunks(file);
    chunks.forEach((chunk, index) => {
      chunk.hash = `${fileHash}-${index}`;
    });
    console.log("chunks", chunks);
    console.log("status", status);

    setFileChunks(chunks);
    setUploadStatus(status);
  };

  // 开始上传
  const handleUpload = async () => {
    if (!selectedFile || !fileChunks.length) return;

    setUploading(true);
    abortController.current = new AbortController();

    const fileHash = await calculateHash(selectedFile);
    const uploadedChunks = uploadStatus?.uploadedChunks || [];

    try {
      // 上传所有未上传的切片
      const tasks = fileChunks
        .filter((chunk) => !uploadedChunks.includes(chunk.hash))
        .map((chunk) => uploadChunk(chunk, fileHash, selectedFile.name));

      await Promise.all(tasks);

      // 所有切片上传完成后，请求合并
      await mergeChunks(fileHash, selectedFile.name);
    } catch (error) {
      onError?.(error);
      message.error("上传失败！");
    } finally {
      setUploading(false);
      abortController.current = null;
    }
  };

  // 取消上传
  const handleCancel = () => {
    abortController.current?.abort();
    setUploading(false);
  };

  // 计算总进度
  const calculateTotalProgress = () => {
    if (!fileChunks.length) return 0;
    const progress =
      fileChunks.reduce((acc, chunk) => acc + chunk.percentage, 0) /
      fileChunks.length;
    onProgress?.(progress);
    return progress;
  };

  return (
    <div className="file-upload">
      <div className="upload-control">
        <input type="file" onChange={handleFileSelect} disabled={uploading} />
        <button
          className="upload-button"
          onClick={handleUpload}
          disabled={!selectedFile || uploading}
        >
          {uploading ? "上传中..." : "开始上传"}
        </button>
        {uploading && (
          <button className="cancel-button" onClick={handleCancel}>
            取消上传
          </button>
        )}
      </div>

      {selectedFile && (
        <div className="file-info">
          <p>文件名：{selectedFile.name}</p>
          <p>
            文件大小：
            {(selectedFile.size / 1024 / 1024).toFixed(2)}MB
          </p>
          <div className="total-progress">
            <div className="progress-bar">
              <div
                className="progress"
                style={{ width: `${calculateTotalProgress()}%` }}
              />
            </div>
            <span className="progress-text">
              {calculateTotalProgress().toFixed(2)}%
            </span>
          </div>
        </div>
      )}

      {fileChunks.length > 0 && (
        <table className="chunks-table">
          <thead>
            <tr>
              <th>分片序号</th>
              <th>分片大小</th>
              <th>上传进度</th>
              <th>状态</th>
            </tr>
          </thead>
          <tbody>
            {fileChunks.map((chunk) => (
              <tr key={chunk.hash}>
                <td>{chunk.index + 1}</td>
                <td>{(chunk.size / 1024).toFixed(2)}KB</td>
                <td>
                  <div className="progress-bar">
                    <div
                      className="progress"
                      style={{ width: `${chunk.percentage}%` }}
                    />
                  </div>
                </td>
                <td>
                  {chunk.percentage === 100
                    ? "完成"
                    : chunk.percentage > 0
                    ? "上传中"
                    : "等待上传"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default FileUpload;
