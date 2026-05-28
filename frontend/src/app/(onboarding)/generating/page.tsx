import React from 'react';
import { GeneratingScreen } from '../../../components/onboarding/GeneratingScreen';
import styles from './page.module.scss';
import { Header } from '../../../components/Header';
import { Footer } from '../../../components/Footer';

export default function GeneratingPage() {
  return (
    <>
      <Header />
      <main className={`layout-main ${styles.generatingPage}`}>
        <GeneratingScreen />
      </main>
      <Footer />
    </>
  );
}
