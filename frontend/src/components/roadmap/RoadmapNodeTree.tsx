'use client';
import React from 'react';
import styles from './RoadmapNodeTree.module.scss';

export interface NodeData {
  id: string;
  title: string;
  description: string;
  status: 'completed' | 'inProgress' | 'locked';
}

interface RoadmapNodeTreeProps {
  subjectName: string;
  nodes: NodeData[];
}

export function RoadmapNodeTree({ subjectName, nodes }: RoadmapNodeTreeProps) {
  const getStatusLabel = (status: NodeData['status']) => {
    switch(status) {
      case 'completed': return 'Đã Hoàn Thành';
      case 'inProgress': return 'Đang Học';
      case 'locked': return 'Đã Khóa';
      default: return '';
    }
  };

  const getStatusClass = (status: NodeData['status']) => {
    switch(status) {
      case 'completed': return styles.completed;
      case 'inProgress': return styles.inProgress;
      case 'locked': return styles.locked;
      default: return '';
    }
  };

  return (
    <div className={styles.treeContainer}>
      <div className={styles.treeHeader}>
        <h1>{subjectName.replace(/-/g, ' ')}</h1>
        <p>Lộ trình học tập được cá nhân hóa qua từng module kiến thức</p>
      </div>

      <div className={styles.nodesWrapper}>
        {nodes.map((node) => (
          <div key={node.id} className={styles.nodeItem}>
            {/* The circular dot on the central line */}
            <div className={`${styles.nodeConnector} ${getStatusClass(node.status)}`} />
            
            {/* The node details card */}
            <div className={`${styles.nodeCard} ${getStatusClass(node.status)}`}>
              <h3>{node.title}</h3>
              <p>{node.description}</p>
              <span className={styles.nodeTag}>
                {getStatusLabel(node.status)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
