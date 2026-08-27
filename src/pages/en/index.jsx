import React from 'react';
import Layout from '@theme/Layout';
import Head from '@docusaurus/Head';
import Hero from '@site/src/components/Hero';
import Features3Column from '@site/src/components/Features3Column';
import LeadForm from '@site/src/components/LeadForm';
// Đặt tên `_content.js`: plugin pages coi mọi file .js trong src/pages là route,
// tiền tố `_` nằm trong danh sách exclude mặc định nên không sinh ra /en/content.
import { hero, skills, leadForm } from './_content';

const SITE = 'https://luoi-hr.vercel.app';
const TITLE = 'Lười HR — AI for HR people';
const DESC = 'Build an HR Agent in 10 minutes, no code. Free browser-based HR tools: turn Excel into an org chart in 1 second, nothing uploaded, no sign-up.';

export default function EnglishHome() {
  return (
    <Layout>
      <Head>
        {/* <Layout title> sẽ nối thêm site title tiếng Việt, nên set <title> tại đây */}
        <html lang="en" />
        <title>{TITLE}</title>
        <meta name="description" content={DESC} />
        <link rel="canonical" href={`${SITE}/en/`} />
        <link rel="alternate" hrefLang="en" href={`${SITE}/en/`} />
        <link rel="alternate" hrefLang="vi" href={`${SITE}/`} />
        <link rel="alternate" hrefLang="x-default" href={`${SITE}/`} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${SITE}/en/`} />
        <meta property="og:locale" content="en_US" />
        <meta property="og:title" content={TITLE} />
        <meta property="og:description" content={DESC} />
        <meta property="og:image" content={`${SITE}/img/social-card-v2.png`} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <Hero t={hero} />
      <Features3Column t={skills} />
      <LeadForm t={leadForm} />
    </Layout>
  );
}
