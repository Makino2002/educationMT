'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import styles from './ProfileWizard.module.scss';
import { saveToStorage } from '../../lib/storage';

const STEPS_DATA = [
  {
    id: 'grade',
    title: 'Bạn đang học lớp mấy?',
    desc: 'Để AI điều chỉnh khung chương trình phù hợp nhất.',
    options: ['Lớp 9', 'Lớp 10', 'Lớp 11', 'Lớp 12', 'Đại học', 'Người đi làm'],
    multiple: false
  },
  {
    id: 'level',
    title: 'Đánh giá năng lực hiện tại',
    desc: 'Đừng ngại ngần, AI sẽ giúp bạn lấp đầy lỗ hổng kiến thức.',
    options: ['Mất gốc', 'Trung bình (5-6.5)', 'Khá (6.5-8)', 'Giỏi (8-9)', 'Xuất sắc (9+)'],
    multiple: false
  },
  {
    id: 'goal',
    title: 'Mục tiêu học tập của bạn là gì?',
    desc: 'Đích đến càng rõ ràng, đường đi càng ngắn lại.',
    options: ['Nhập môn / Lấy lại căn bản', 'Nâng cao điểm số trên lớp', 'Ôn thi THPT Quốc gia', 'Lấy thẻ IELTS / TOEIC', 'Luyện thi Học sinh giỏi'],
    multiple: false
  },
  {
    id: 'interests',
    title: 'Bạn muốn AI tập trung vào môn nào?',
    desc: 'Có thể chọn nhiều môn học cùng lúc.',
    options: ['Toán học', 'Vật lý', 'Hóa học', 'Tiếng Anh', 'Ngữ Văn', 'Sinh học', 'Khoa học máy tính', 'Kỹ năng mềm'],
    multiple: true
  }
];

export function ProfileWizard() {
  const router = useRouter();
  const user = useSelector((state: RootState) => state.auth.user);
  const [step, setStep] = useState(0); // 0 to 3
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({
    grade: '',
    level: '',
    goal: '',
    interests: []
  });

  const currentStepData = STEPS_DATA[step];
  
  const handleSelect = (option: string) => {
    if (currentStepData.multiple) {
      const currentSelected = (answers[currentStepData.id] as string[]) || [];
      const newSelected = currentSelected.includes(option)
        ? currentSelected.filter(item => item !== option)
        : [...currentSelected, option];
      setAnswers({ ...answers, [currentStepData.id]: newSelected });
    } else {
      setAnswers({ ...answers, [currentStepData.id]: option });
    }
  };

  const handleNext = () => {
    if (step < STEPS_DATA.length - 1) {
      setStep(step + 1);
    } else {
      saveToStorage('user_profile', answers);
      router.push('/assessment');
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const isNextDisabled = () => {
    const currentAnswer = answers[currentStepData.id];
    if (currentStepData.multiple) {
      return (currentAnswer as string[]).length === 0;
    }
    return !currentAnswer;
  };

  return (
    <div className={styles.wizardContainer}>
      <div className={styles.progress}>
        {STEPS_DATA.map((_, idx) => (
          <div key={idx} className={`${styles.dot} ${idx <= step ? styles.active : ''}`} />
        ))}
      </div>

      <div className={styles.stepContent} key={step}>
        {step === 0 && <h2 style={{color: '#ff782d', marginBottom: '1rem', fontSize: '1.2rem'}}>Chào mừng {user?.name || 'bạn'}!</h2>}
        <h2>{currentStepData.title}</h2>
        <p>{currentStepData.desc}</p>

        <div className={styles.optionsGrid}>
          {currentStepData.options.map((option) => {
            const isSelected = currentStepData.multiple
              ? (answers[currentStepData.id] as string[]).includes(option)
              : answers[currentStepData.id] === option;

            return (
              <button
                key={option}
                type="button"
                onClick={() => handleSelect(option)}
                aria-pressed={isSelected}
                className={`${styles.optionBtn} ${isSelected ? styles.selected : ''}`}
              >
                {option}
              </button>
            );
          })}
        </div>
      </div>

      <div className={`${styles.actions} `}>
        {step > 0 ? (
          <button  onClick={handleBack}>
            ← Quay lại
          </button>
        ) : <div />}
        <button 
          onClick={handleNext}
          disabled={isNextDisabled()}
        >
          {step === STEPS_DATA.length - 1 ? 'Hoàn thành' : 'Tiếp tục'}
        </button>
      </div>
    </div>
  );
}
