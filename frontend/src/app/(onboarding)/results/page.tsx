import React from 'react';
import { ResultScreen } from '../../../components/onboarding/ResultScreen';
import styles from './page.module.scss';
import { Header } from '../../../components/Header';
import { Footer } from '../../../components/Footer';

export default function ResultsPage() {
  return (
    <>
      <Header />
      <main className={`layout-main ${styles.resultsPage}`}>
        <ResultScreen />
      </main>
      <Footer />
    </>
  );
}
