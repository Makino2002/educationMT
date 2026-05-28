import React from 'react';
import { AuthCard } from '../../../components/auth/AuthCard';
import styles from './page.module.scss';

export default function LoginPage() {
  return (
    <div className={styles.loginPage}>
      <AuthCard />
    </div>
  );
}
