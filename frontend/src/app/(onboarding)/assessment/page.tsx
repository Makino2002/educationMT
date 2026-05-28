import React from 'react';
import { AssessmentWizard } from '../../../components/onboarding/AssessmentWizard';
import styles from './page.module.scss';
import { Header } from '../../../components/Header';
import { Footer } from '../../../components/Footer';

export default function AssessmentPage() {
  return (
    <>
      <Header />
      <main className={`layout-main ${styles.assessmentPage}`}>
        <AssessmentWizard />
      </main>
      <Footer />
    </>
  );
}
