import React from 'react';
import { AuthCard } from '../../../components/auth/AuthCard';
import styles from './page.module.scss';

export default function RegisterPage() {
  return (
    <div className={styles.registerPage}>
      <AuthCard isRegister={true} />
    </div>
  );
}
