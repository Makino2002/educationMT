'use client';
import React from 'react';
import styles from './AuthCard.module.scss';
import { LoginForm } from './LoginForm';
import { useRouter } from 'next/navigation';

export function AuthCard({ isRegister = false }: { isRegister?: boolean }) {
  const router = useRouter();
  return (
    <div className={styles.cardWrapper}>
      <div className={styles.header}>

        <div className={styles.logoBox} onClick={() => router.push('/')}>
          <svg width="24" height="24" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 10 H20 V30 H10 Z" fill="#0088ff"/>
            <path d="M22 10 L32 20 L22 30 Z" fill="#ff782d"/>
          </svg>
          Education MT
        </div>
        <h2>Bắt đầu hành trình</h2>
        
        <p>{isRegister ? 'Đăng ký để AI tạo lộ trình dành riêng cho bạn' : 'Đăng nhập để AI tạo lộ trình dành riêng cho bạn'}</p>
      </div>
      <LoginForm initialIsLogin={!isRegister} />
    </div>
  );
}
