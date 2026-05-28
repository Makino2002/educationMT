import React from 'react';
import styles from './Footer.module.scss';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.links}>
        <Link href="#">Về chúng tôi</Link>
        <Link href="#">Sản phẩm</Link>
        <Link href="#">Điều khoản</Link>
        <Link href="#">Bảo mật</Link>
      </div>
      <p className={styles.copyright}>© 2026 AI OS Education. All rights reserved.</p>
    </footer>
  );
}
