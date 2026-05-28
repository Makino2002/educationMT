'use client';
import React from 'react';
import { motion } from 'framer-motion';
import styles from './WorkflowSection.module.scss';
import { useRouter } from 'next/navigation';

export function WorkflowSection() {
  const router = useRouter();

  const tests = [
    { title: "Math", icon: "📐", difficulty: "Beginner", time: "3 min" },
    { title: "English", icon: "🇬🇧", difficulty: "Beginner", time: "3 min" },
    { title: "Programming", icon: "💻", difficulty: "Beginner", time: "3 min" }
  ];

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <motion.h2 
          className={styles.title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          QUY TRÌNH HỌC TẬP VỚI AI
        </motion.h2>

        <div className={styles.bridgeContainer}>
          <div className={styles.latestTest}>
            <h3>BÀI TEST MỚI NHẤT</h3>
            <p>Nhà modules cho nhỏ bé, mầm non, siêu anh hùng hiện đại công programme</p>
            <button onClick={() => router.push('/login')}>LÀM NGAY</button>
          </div>

          <div className={styles.testCards}>
            {tests.map((test, index) => (
              <motion.div 
                className={styles.testCard} 
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <div className={styles.cardHeader}>
                  <div className={styles.iconTitle}>
                    <span className={styles.icon}>{test.icon}</span>
                    <h4>{test.title}</h4>
                  </div>
                  <span className={styles.badge}>🏅</span>
                </div>
                <div className={styles.loadingBar}>
                    <div className={styles.progress}></div>
                </div>
                <div className={styles.cardFooter}>
                  <span>⌛ Difficulty {test.time}</span>
                </div>
                <button className={styles.cardBtn} onClick={() => router.push('/login')}>LÀM NGAY</button>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
