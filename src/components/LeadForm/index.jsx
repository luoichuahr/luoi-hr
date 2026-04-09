import React, { useState } from 'react';
import styles from './styles.module.css';

export default function LeadForm() {
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    position: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const GOOGLE_FORM_URL = process.env.REACT_APP_GOOGLE_FORM_URL || '';
    if (GOOGLE_FORM_URL) {
      const form = document.createElement('form');
      form.method = 'POST';
      form.action = GOOGLE_FORM_URL;
      Object.keys(formData).forEach((key) => {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = key;
        input.value = formData[key];
        form.appendChild(input);
      });
      document.body.appendChild(form);
      form.submit();
    }
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', contact: '', position: '' });
    }, 1800);
  };

  return (
    <section className={styles.formSection}>
      <div className={styles.container}>
        <div className={styles.formWrapper}>
          <h2 className={styles.title}>Hãy bắt đầu ngay</h2>
          <p className={styles.subtitle}>
            Khám phá cách AI giúp bạn tiết kiệm hàng giờ làm việc mỗi tuần
          </p>

          {!submitted ? (
            <form className={styles.form} onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Họ tên của bạn"
                value={formData.name}
                onChange={handleChange}
                required
                className={styles.input}
              />

              <input
                type="text"
                name="contact"
                placeholder="Zalo hoặc Email"
                value={formData.contact}
                onChange={handleChange}
                required
                className={styles.input}
              />

              <select
                name="position"
                value={formData.position}
                onChange={handleChange}
                required
                className={styles.input}
              >
                <option value="">Chọn vị trí của bạn</option>
                <option value="HRBP">HRBP</option>
                <option value="Recruiter">Recruiter</option>
                <option value="C&B">C&B</option>
                <option value="Khác">Khác</option>
              </select>

              <button type="submit" className={styles.submitBtn}>
                Dùng thử ngay
              </button>
            </form>
          ) : (
            <div className={styles.successMsg}>
              ✓ Đã gửi! Lười Chúa sẽ liên hệ sớm.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
