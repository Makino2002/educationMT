'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './GeneratingScreen.module.scss';
import { getFromStorage } from '../../lib/storage';

const PHASES = [
  'Khởi tạo lõi AI...',
  'Đang phân tích kết quả đánh giá...',
  'Xây dựng ma trận kiến thức cá nhân...',
  'Ghép nối dữ liệu môn học mục tiêu...',
  'Đang tối ưu lộ trình siêu tốc...',
  'Hoàn tất! Chuẩn bị chuyển hướng...'
];

export function GeneratingScreen() {
  const router = useRouter();
  const [phaseIdx, setPhaseIdx] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Fake progress loading
    const totalTime = 5000; // 5 seconds
    const intervalTime = 50; 
    const steps = totalTime / intervalTime;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const currentProgress = (currentStep / steps) * 100;
      setProgress(currentProgress);

      const phase = Math.floor((currentStep / steps) * PHASES.length);
      if (phase < PHASES.length && phase !== phaseIdx) {
        setPhaseIdx(phase);
      }

      if (currentStep >= steps) {
        clearInterval(timer);
        setTimeout(() => {
          router.push('/results');
        }, 500);
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, [router, phaseIdx]);

  return (
    <div className={styles.generatingContainer}>
      <div className={styles.spinnerBox}>
        <div className={styles.glowRing} />
        <div className={styles.innerRing} />
        <div className={styles.centerCore} />
      </div>

      <div className={styles.statusText} key={PHASES[phaseIdx]}>
        {PHASES[phaseIdx]}
      </div>

      <div className={styles.progressBar}>
        <div className={styles.progressFill} style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
}
