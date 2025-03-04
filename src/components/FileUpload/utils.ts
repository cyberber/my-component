/*
 * @Author: cyberber 978265004@qq.com
 * @Date: 2025-03-04 08:54:49
 * @LastEditors: cyberber 978265004@qq.com
 * @LastEditTime: 2025-03-04 08:57:37
 * @FilePath: /my-component/src/components/FileUpload/utils.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// 计算文件hash
export const calculateHash = async (file: File): Promise<string> => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onload = (e) => {
      const buffer = e.target?.result as ArrayBuffer;
      const spark = new SparkMD5.ArrayBuffer();
      spark.append(buffer);
      const hash = spark.end();
      resolve(hash);
    };
  });
};

// 模拟延迟
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// 模拟检查文件状态
export const mockCheckFile = async (fileHash: string) => {
  await delay(500);
  // 模拟 30% 的概率文件已存在
  const exists = Math.random() < 0.3;
  
  if (exists) {
    return {
      uploadedChunks: [],
      filename: "mock-file.txt",
      fileHash,
    };
  }
  
  return null;
};

// 模拟上传分片
export const mockUploadChunk = async (chunk: Blob, hash: string) => {
  // 模拟上传耗时 1-3 秒
  await delay(1000 + Math.random() * 2000);
  
  // 模拟 5% 的概率上传失败
  if (Math.random() < 0.05) {
    throw new Error("模拟上传失败");
  }
  
  return {
    code: 0,
    data: {
      hash,
      url: `http://mock-url.com/${hash}`,
    },
  };
};

// 模拟合并请求
export const mockMergeChunks = async (fileHash: string, filename: string) => {
  await delay(1000);
  
  return {
    code: 0,
    data: {
      url: `http://mock-url.com/${fileHash}/${filename}`,
    },
  };
}; 