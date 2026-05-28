'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import styles from './SSOButtons.module.scss';
import { saveToStorage } from '../../lib/storage';

export function SSOButtons() {
  const router = useRouter();

  const handleSSO = (provider: string) => {
    // Mock xử lý SSO => Lưu localstorage & qua Step 3
    saveToStorage('auth_user', { provider, loggedIn: true });
    router.push('/profile');
  };

  return (
    <div className={styles.ssoContainer}>
      <button className={styles.ssoBtn} onClick={() => handleSSO('google')}>
        <span>🌐</span> Đăng nhập với Google
      </button>
      <button className={styles.ssoBtn} onClick={() => handleSSO('microsoft')}>
        <span>💼</span> Đăng nhập với Microsoft
      </button>
    </div>
  );
}
