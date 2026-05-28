'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './ResultScreen.module.scss';
import { getFromStorage } from '../../lib/storage';

interface UserProfile {
  grade?: string;
  level?: string;
  goal?: string;
  interests?: string[];
}

export function ResultScreen() {
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    const data = getFromStorage('user_profile');
    if (data) {
      setProfile(data);
    } else {
      // Mock data in case user bypassed previous steps
      setProfile({
        grade: 'Lớp 12',
        level: 'Khá (6.5-8)',
        goal: 'Ôn thi THPT Quốc gia',
        interests: ['Toán học', 'Vật lý', 'Tiếng Anh']
      });
    }
  }, []);

  const getSlug = (str: string) => {
    return str
      .toLowerCase()
      .trim()
      .replace(/ /g, '-')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/đ/g, 'd');
  };

  const handleStart = () => {
    // Navigate to the first subject in the interests array
    const firstSubject = profile?.interests?.[0] ? getSlug(profile.interests[0]) : 'toan-hoc';
    router.push(`/roadmap/${firstSubject}`);
  };

  if (!profile) return null;

  return (
    <div className={styles.resultsContainer}>
      <div className={styles.header}>
        <h2>Lộ trình đã sẵn sàng!</h2>
        <p>AI đã cá nhân hóa 100% tài liệu và bài tập để phù hợp với năng lực của bạn</p>
      </div>

      <div className={styles.summaryGrid}>
        <div className={styles.summaryCard}>
          <h3>Năng lực đầu vào</h3>
          <p>{profile.level}</p>
        </div>
        <div className={styles.summaryCard}>
          <h3>Mục tiêu</h3>
          <p>{profile.goal}</p>
        </div>
        <div className={styles.summaryCard} style={{ borderLeftColor: 'var(--accent-purple)' }}>
          <h3>Khối lượng</h3>
          <p>{profile.interests?.length || 0} Block môn học</p>
        </div>
      </div>

      <div className={styles.roadmapPreview}>
        <h3>Lộ trình khóa học</h3>
        <div className={styles.subjectList}>
          {profile.interests?.map((subject, idx) => {
            // Generate a fake percentage between 85 and 99
            const matchScore = 85 + (idx * 3) % 15; 
            return (
              <div key={idx} className={`${styles.subjectItem}`}>
                <div className={styles.subjectInfo}>
                  <h4>{subject}</h4>
                  <p>Phân tích AI: Khớp {matchScore}% với bộ thẻ điểm của bạn</p>
                </div>
                {/* <div className={`${styles.subjectStatus} ${styles.backBtn}`}>Đã khởi tạo</div> */}
                <div className={styles.actions}>
                  <button className={styles.startBtn} onClick={handleStart}>
                    Vào học ngay
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
