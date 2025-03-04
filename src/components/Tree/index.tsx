import React from "react";
import { TreeNode, TreeProps } from "./types";
import "./styles.scss";

const Tree: React.FC<TreeProps> = ({
  data,
  selectedKey,
  onSelect,
  loading,
}) => {
  const renderTreeNode = (node: TreeNode) => {
    const isSelected = node.id === selectedKey;

    return (
      <div key={node.id} className="tree-node">
        <div
          className={`tree-node-content ${isSelected ? "selected" : ""}`}
          onClick={() => onSelect(node)}
        >
          {node.label}
        </div>
        {node.children && (
          <div className="tree-node-children">
            {node.children.map((child) => renderTreeNode(child))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="tree-component">
      {loading ? (
        <div className="tree-loading">加载中...</div>
      ) : (
        data.map((node) => renderTreeNode(node))
      )}
    </div>
  );
};

export default Tree;
