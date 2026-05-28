'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import styles from './HeroSection.module.scss';
 
export function HeroSection() {
  const router = useRouter();

  const handleStart = () => {
    router.push('/login');
  };

  const features = [
    { title: "AI PHÂN TÍCH ĐẦU VÀO", desc: "Giám sát định vị năng lực hiện tại", icon: "🧠" },
    { title: "LỘ TRÌNH CÁ NHÂN HÓA", desc: "Lộ trình học độc lập cho mỗi người", icon: "📍" },
    { title: "HỌC & THEO DÕI TIẾN ĐỘ", desc: "Theo dõi sự trưởng thành với data performance", icon: "📊" },
  ];

  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <motion.div 
          className={styles.content}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className={styles.title}>
            LỘ TRÌNH HỌC TẬP CÁ NHÂN HÓA BỞI AI
          </h1>
          <p className={styles.subtitle}>
            BẮT ĐẦU VỚI BÀI TEST ĐẦU VÀO ĐỂ<br/>
            AI PHÂN TÍCH NĂNG LỰC CỦA BẠN
          </p>
          <button className={styles.ctaButton} onClick={handleStart}>
            LÀM BÀI TEST ĐẦU VÀO NGAY
          </button>
        </motion.div>

        <motion.div 
          className={styles.cardsRow}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {features.map((f, i) => (
             <div key={i} className={styles.featureCard}>
               <div className={styles.icon}>{f.icon}</div>
               <div>
                  <h3>{f.title}</h3>
                  <p>{f.desc}</p>
               </div>
             </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
