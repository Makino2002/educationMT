import React from 'react';
import styles from './ValueProposition.module.scss';

const features = [
  {
    title: 'AI Tutor Thế Hệ Mới',
    desc: 'Theo sát 1:1, giải đáp thắc mắc và hỗ trợ bạn trong suốt quá trình học tập theo thời gian thực.',
    icon: '🤖',
  },
  {
    title: 'Skill Passport',
    desc: 'Lưu trữ thành tích, thẻ điểm năng lực và các cột mốc quan trọng vào hộ chiếu kỹ năng số của riêng bạn.',
    icon: '🛂',
  },
  {
    title: 'AI Cảnh Báo Sớm',
    desc: 'Dự đoán sớm các lỗ hổng kiến thức trước khi kỳ thi diễn ra bằng hệ thống phân tích dữ liệu chuyên sâu.',
    icon: '⚡',
  },
];

export function ValueProposition() {
  return (
    <section className={styles.container}>
      {features.map((feat, index) => (
        <div key={index} className={styles.card}>
          <div className={styles.icon}>{feat.icon}</div>
          <h3 className={styles.title}>{feat.title}</h3>
          <p className={styles.desc}>{feat.desc}</p>
        </div>
      ))}
    </section>
  );
}
