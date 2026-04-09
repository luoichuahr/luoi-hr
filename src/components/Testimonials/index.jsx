import React from 'react';
import styles from './styles.module.css';

export default function Testimonials() {
  const testimonials = [
    {
      quote:
        'Lười HR tiết kiệm cho tôi 5 giờ mỗi tuần. Chỉ cần copy prompt, bỏ vào AI là xong!',
      author: 'Thanh Hương',
      position: 'HRBP - Công ty Cổ phần XYZ',
    },
    {
      quote:
        'Template JD rất chi tiết và chuẩn. Không cần sủa gì mà ứng viên hiểu ngay.',
      author: 'Minh Anh',
      position: 'Recruiter - Startup Tech',
    },
    {
      quote:
        'Agent setup A-Z của Lười HR rất kỹ. Giờ tôi dùng AI để handle KPI tự động.',
      author: 'Quỳnh Anh',
      position: 'C&B Manager - Công ty 500+ nhân sự',
    },
  ];

  return (
    <section className={styles.testimonials}>
      <div className={styles.container}>
        <h2 className={styles.title}>Mọi người nói gì về Lười HR</h2>

        <div className={styles.grid}>
          {testimonials.map((testimonial, idx) => (
            <div key={idx} className={styles.card}>
              <div className={styles.stars}>⭐⭐⭐⭐⭐</div>
              <p className={styles.quote}>"{testimonial.quote}"</p>
              <div className={styles.author}>{testimonial.author}</div>
              <div className={styles.position}>{testimonial.position}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
