import React from 'react';
import styles from './styles.module.css';

export default function Features3Column() {
  const features = [
    {
      icon: '⚡',
      title: 'Tạo JD trong 10 giây',
      description:
        'Tự động tạo mô tả công việc chuẩn chỉnh chỉ với 1 prompt',
    },
    {
      icon: '📊',
      title: 'Xây dựng KPI tự động',
      description:
        'Thiết kế KPI theo từng vị trí HR chỉ trong vài phút',
    },
    {
      icon: '🤖',
      title: 'AI Agent theo vai trò',
      description:
        'Tạo agent riêng cho HRBP, Recruiter, C&B và nhiều hơn nữa',
    },
  ];

  return (
    <section className={styles.features}>
      <div className={styles.container}>
        <h2 className={styles.title}>Những tính năng mạnh mẽ</h2>

        <div className={styles.grid}>
          {features.map((feature, idx) => (
            <div key={idx} className={styles.card}>
              <div className={styles.icon}>{feature.icon}</div>
              <h3 className={styles.cardTitle}>{feature.title}</h3>
              <p className={styles.cardDesc}>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
