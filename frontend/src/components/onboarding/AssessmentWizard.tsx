'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './AssessmentWizard.module.scss';
import { saveToStorage } from '../../lib/storage';

const QUESTIONS = [
  {
    id: 'q1',
    question: 'Hãy chọn phương pháp tư duy bạn hay dùng nhất khi gặp một bài toán khó?',
    options: ['Tìm kiếm công thức có sẵn', 'Phân tích từ từ và chia nhỏ bài toán', 'Đoán đáp án rồi thử ngược lại', 'Nhờ sự trợ giúp ngay lập tức'],
  },
  {
    id: 'q2',
    question: 'Giả sử một quả bóng được thả rơi tự do từ độ cao, yếu tố nào ảnh hưởng nhiều nhất đến thời gian rơi (bỏ qua lực cản)?',
    options: ['Khối lượng', 'Kích thước', 'Độ cao ban đầu', 'Màu sắc'],
  },
  {
    id: 'q3',
    question: 'Theo bạn, kỹ năng nào quan trọng nhất trong kỷ nguyên số?',
    options: ['Học thuộc lòng nhanh', 'Tự học và Thích ứng (Self-learning)', 'Tính nhẩm thần tốc', 'Viết chữ đẹp'],
  }
];

export function AssessmentWizard() {
  const router = useRouter();
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const question = QUESTIONS[currentIdx];
  const progress = ((currentIdx + 1) / QUESTIONS.length) * 100;

  const handleSelect = (option: string) => {
    setAnswers({ ...answers, [question.id]: option });
  };

  const handleNext = () => {
    if (currentIdx < QUESTIONS.length - 1) {
      setCurrentIdx(currentIdx + 1);
    } else {
      saveToStorage('assessment_results', answers);
      router.push('/generating');
    }
  };

  return (
    <div className={styles.wizardContainer}>
      <div className={styles.header}>
        <span className={styles.badge}>Câu hỏi Đánh giá {currentIdx + 1} / {QUESTIONS.length}</span>
        <div className={styles.progressBar}>
          <div className={styles.progressFill} style={{ width: `${progress}%` }} />
        </div>
      </div>

      <div className={styles.questionContent} key={currentIdx}>
        <h2>{question.question}</h2>
        
        <div className={styles.optionsList}>
          {question.options.map((opt) => (
            <button
              key={opt}
              onClick={() => handleSelect(opt)}
              className={`${styles.optionBtn} ${answers[question.id] === opt ? styles.selected : ''}`}
            >
              <div className={styles.radioIndicator} />
              {opt}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.actions}>
        <button 
          className={styles.nextBtn} 
          onClick={handleNext}
          disabled={!answers[question.id]}
        >
          {currentIdx === QUESTIONS.length - 1 ? 'Hoàn thành' : 'Câu tiếp theo'}
        </button>
      </div>
    </div>
  );
}
