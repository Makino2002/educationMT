import React, { use } from 'react';
import styles from './page.module.scss';
import { RoadmapNodeTree, NodeData } from '../../../../components/roadmap/RoadmapNodeTree';

export default function SubjectRoadmapPage({ params }: { params: Promise<{ subjectId: string }> }) {
  const resolvedParams = use(params);
  
  // Fake mock data for the network/tree map
  const mockNodes: NodeData[] = [
    {
      id: 'n1',
      title: 'Nhập môn Cơ bản',
      description: 'Khái niệm nền tảng và tư duy bước đầu.',
      status: 'completed'
    },
    {
      id: 'n2',
      title: 'Kỹ năng Phân tích (Core 1)',
      description: 'Làm quen với các công cụ phân tích dữ kiện cốt lõi.',
      status: 'completed'
    },
    {
      id: 'n3',
      title: 'Tối ưu hóa và Thực hành',
      description: 'Giảng dạy tập trung vào giải phẫu vấn đề.',
      status: 'inProgress'
    },
    {
      id: 'n4',
      title: 'Thử thách nâng cao (Boss stage)',
      description: 'Tổng hợp kiến thức để phá đảo module học.',
      status: 'locked'
    },
    {
      id: 'n5',
      title: 'Dự án Cuối kỳ',
      description: 'Thực hành dựa trên thế giới thực.',
      status: 'locked'
    }
  ];

  return (
    <div className={styles.dashboardPage}>
      <RoadmapNodeTree 
        subjectName={resolvedParams.subjectId} 
        nodes={mockNodes} 
      />
    </div>
  );
}
