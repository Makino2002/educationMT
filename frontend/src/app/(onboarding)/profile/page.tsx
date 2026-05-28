import React from 'react';
import { ProfileWizard } from '../../../components/onboarding/ProfileWizard';
import styles from './page.module.scss';
import { Header } from '../../../components/Header';
import { Footer } from '../../../components/Footer';
import { ProtectedRoute } from '../../../components/ProtectedRoute';

export default function ProfilePage() {
  return (
    <>
      <Header />
      <main className={`layout-main ${styles.profilePage}`}>
        <ProtectedRoute>
          <ProfileWizard />
        </ProtectedRoute>
      </main>
      <Footer />
    </>
  );
}
