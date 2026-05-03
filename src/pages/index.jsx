import React from 'react';
import Layout from '@theme/Layout';
import Hero from '@site/src/components/Hero';
import Features3Column from '@site/src/components/Features3Column';
import Testimonials from '@site/src/components/Testimonials';
import TrustIndicators from '@site/src/components/TrustIndicators';
import LeadForm from '@site/src/components/LeadForm';

export default function Home() {
  return (
    <Layout
      title="Lười HR — AI cho dân Nhân Sự"
      description="Lazy, not stupid. Dùng AI để làm việc nhanh hơn. Xây dựng HR Agent trong 10 phút."
    >
      <Hero />
      <Features3Column />
      {/* <Testimonials /> */}
      {/* <TrustIndicators /> */}
      <LeadForm />
    </Layout>
  );
}
