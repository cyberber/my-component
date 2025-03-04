/*
 * @Author: cyberber 978265004@qq.com
 * @Date: 2025-03-03 16:30:32
 * @LastEditors: cyberber 978265004@qq.com
 * @LastEditTime: 2025-03-04 08:56:27
 * @FilePath: /my-component/src/components/StoreSelector/types.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { TreeNode } from "../Tree/types";

export interface StoreSelectorProps {
  visible: boolean;
  onClose: () => void;
  onSelect: (stores: TreeNode[]) => void;
  maxSelection?: number; // 最大可选数量，不设置则不限制
}

export interface Location {
  province: TreeNode | null;
  city: TreeNode | null;
  district: TreeNode | null;
}

// 新增选中门店的类型
export interface SelectedStore {
  store: TreeNode;
  location: {
    province: TreeNode;
    city: TreeNode;
    district: TreeNode;
  };
} 