export interface FileChunk {
  chunk: Blob;
  hash: string;
  index: number;
  percentage: number;
  size: number;
}

export interface UploadStatus {
  uploadedChunks: string[];
  filename: string;
  fileHash: string;
}

export interface FileUploadProps {
  action: string; // 上传地址
  chunkSize?: number; // 切片大小，默认 5MB
  maxSize?: number; // 最大文件大小，默认 1GB
  onSuccess?: (response: any) => void;
  onError?: (error: Error) => void;
  onProgress?: (percentage: number) => void;
} 