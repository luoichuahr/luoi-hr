import React from 'react';
import Layout from '@theme/Layout';
import Head from '@docusaurus/Head';
import styles from './index.module.css';

const SITE = 'https://luoi-hr.vercel.app';

// Chỉ liệt kê tool đã có bản tiếng Anh thật. Tool chưa dịch để nguyên ở mục
// "the rest of the site" bên dưới, không đưa lên grid để khỏi dẫn khách EN
// vào trang tiếng Việt.
const TOOLS = [
  {
    href: '/en/org-chart/',
    icon: '⌗',
    name: 'Org Chart Builder',
    blurb: 'Drop an Excel file, get an org chart in one second. Drag cards to restructure, then export HTML, PDF or an editable PowerPoint deck.',
    tags: ['Excel in, chart out', 'Nothing uploaded', 'No sign-up'],
  },
];

export default function EnglishHome() {
  return (
    <Layout>
      <Head>
        <html lang="en" />
        <title>Free HR Tools — No Sign-Up, Nothing Uploaded</title>
        <meta
          name="description"
          content="Free browser-based HR tools. Turn an Excel file into an org chart in 1 second — 100% client-side, no upload, no sign-up, no data retention."
        />
        <link rel="canonical" href={`${SITE}/en/`} />
        <link rel="alternate" hrefLang="en" href={`${SITE}/en/`} />
        <link rel="alternate" hrefLang="vi" href={`${SITE}/`} />
        <link rel="alternate" hrefLang="x-default" href={`${SITE}/`} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${SITE}/en/`} />
        <meta property="og:locale" content="en_US" />
        <meta property="og:title" content="Free HR Tools — No Sign-Up, Nothing Uploaded" />
        <meta
          property="og:description"
          content="Free browser-based HR tools. Turn an Excel file into an org chart in 1 second — 100% client-side, no upload, no sign-up."
        />
        <meta property="og:image" content={`${SITE}/img/social-card-v2.png`} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <main className={styles.page}>
        <header className={styles.hero}>
          <p className={styles.kicker}>Lười HR · English edition</p>
          <h1 className={styles.h1}>Free HR tools that never upload your data</h1>
          <p className={styles.lead}>
            Every tool here runs entirely inside your browser tab. Your spreadsheet is parsed on
            your own machine — there is no upload endpoint, no account to create and no database
            behind any of it. Load the page once and you can go offline; it still works.
          </p>
        </header>

        <section className={styles.grid} aria-label="Tools available in English">
          {TOOLS.map((t) => (
            <a key={t.href} className={styles.card} href={t.href}>
              <span className={styles.icon} aria-hidden="true">{t.icon}</span>
              <h2 className={styles.cardName}>{t.name}</h2>
              <p className={styles.cardBlurb}>{t.blurb}</p>
              <ul className={styles.tags}>
                {t.tags.map((tag) => <li key={tag}>{tag}</li>)}
              </ul>
              <span className={styles.cta}>Open the tool →</span>
            </a>
          ))}
        </section>

        <section className={styles.why}>
          <h2 className={styles.h2}>Why client-side matters for HR data</h2>
          <p>
            An employee list is not neutral data. It carries real names, a headcount plan and,
            often, role changes nobody has been told about yet. Most org chart generators ask you
            to create an account and push that file to their servers before they show you anything.
          </p>
          <p>
            These tools take the opposite approach, and it is an architectural fact rather than a
            policy promise: open your browser's Network tab while you build a chart and you will
            see no request carrying your file, because there is no endpoint to carry it to.
          </p>
        </section>

        <section className={styles.rest}>
          <h2 className={styles.h2}>The rest of the site is in Vietnamese</h2>
          <p>
            Lười HR is a Vietnamese site about using AI for HR work — guides, prompt libraries and
            a handful of other free tools. Only the pages linked above are written in English so
            far. You are welcome to browse the{' '}
            <a href="/" hrefLang="vi">Vietnamese homepage</a> and use your browser's translation
            if you want the rest.
          </p>
        </section>
      </main>
    </Layout>
  );
}
