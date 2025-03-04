export interface TreeNode {
  id: string | number;
  label: string;
  children?: TreeNode[];
  isLeaf?: boolean;
}

export interface TreeProps {
  data: TreeNode[];
  selectedKey?: string | number;
  selectedKeys?: (string | number)[];
  onSelect: (node: TreeNode) => void;
  loading?: boolean;
} 