'use client';
import React, { useEffect, useState } from "react";
import styles from "./Header.module.scss";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { authService } from "../services/authService";
import { logoutSuccess } from "../store/slices/authSlice";

import Image from "next/image";
import logo from "../../assets/img/logo.png";

export interface HeaderProps {
  /** Component custom class styles */
  className?: string;
}

export function Header({ className = "" }: HeaderProps) {
  const headerClass = className ? `${styles.header} ${className}` : styles.header;
  const router = useRouter();
  const dispatch = useDispatch();
  const { user, isAuthenticated, token } = useSelector((state: RootState) => state.auth);
  
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    if (token) {
      await authService.logout(token);
    }
    dispatch(logoutSuccess());
    router.push('/');
  };

  return (
    <header className={`${headerClass} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={styles.container}>
        <div className={styles.logoBox} onClick={() => router.push("/")}> 
          <Image src={logo} alt="Education MT Logo" width={1200/5} height={400/5} priority className={styles.logo} /> 
        </div>

        <div className={styles.actions}>
          {isAuthenticated ? (
            <>
              <span style={{color: 'var(--text)', marginRight: '1rem', fontWeight: 600}}>
                Hi, {user?.name}
              </span>
              <button className={styles.primary} onClick={() => router.push('/profile')}>
                Hồ Sơ
              </button>
              <button className={`${styles.actionBtn} ${styles.primary}`} onClick={handleLogout}>
                Đăng Xuất
              </button>
            </>
          ) : (
            <>
              <button className={`${styles.primary}`} onClick={() => router.push('/login')}>
                ĐĂNG NHẬP
              </button>
              <button className={`${styles.actionBtn} ${styles.primary}`} onClick={() => router.push('/register')}>
                ĐĂNG KÝ NGAY
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
