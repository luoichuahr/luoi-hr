// Toàn bộ chuỗi tiếng Anh của trang chủ /en/. Cùng hình dạng với
// src/components/Hero/content.js và src/components/Features3Column/content.js.
// Sửa bản dịch ở đây, không đụng vào component.

export const hero = {
  pill: {
    href: '/en/org-chart/',
    prefix: '✨ Now in English:',
    strong: 'Org Chart Builder',
    suffix: '— try it free →',
  },
  headline: ['HR Agent', 'that handles everything', 'in human resources'],
  sub: 'From JDs and offer letters to KPI frameworks, onboarding journeys and people analytics — hand over the task and the HR Agent does the work.',
  ctaPrimary: { href: '/en/org-chart/', label: 'Try the Org Chart Builder →' },
  ctaSecondary: { href: '#skills', label: 'See 30+ skills' },
  proof: ['Used by', '300+ HR professionals in Vietnam'],
  tags: ['HRBP', 'Recruiter', 'C&B', 'HRM', 'Headhunter'],

  chatTitle: '🤖 HR Agent · Online',
  chatDone: '✓ Done in 3 seconds!',
  scenarios: [
    {
      user: 'Write a JD for a Senior HRBP role',
      items: ['📄 500-word JD, SEO-ready', '❓ 12 interview questions', '📊 Candidate scorecard'],
    },
    {
      user: 'Build April KPIs for the Talent team',
      items: ['🎯 5 clearly measurable KPIs', '📈 Progress dashboard', '📋 Weekly report template'],
    },
    {
      user: 'Design a 30-day onboarding journey',
      items: ['✅ Complete first-day checklist', '📅 30/60/90 day plan', '🤝 Buddy & mentor assignment'],
    },
  ],

  flashcard: {
    href: '/tools/ai-career-wingman',
    label: 'CV builder matched to a JD',
    cta: 'Try it →',
    steps: [
      { icon: '📄', tag: 'Step 1', text: 'Upload your CV...', sub: 'Reading 11 years of experience', color: '#3B82F6' },
      { icon: '🔍', tag: 'Step 2', text: 'Analysing your profile', sub: 'Found 6 achievements with no numbers', color: '#8B5CF6' },
      { icon: '📋', tag: 'Step 3', text: 'Reading JD: HRBP Manager · Bosch', sub: 'Matching against 14 hiring criteria', color: '#F59E0B' },
      { icon: '✨', tag: 'Step 4', text: 'New CV matches this JD 81%', sub: 'Gap report + STAR stories ready', color: '#0D9488' },
      { icon: '📍', tag: 'Step 5', text: 'Bosch is ~22 minutes from home 🛵', sub: 'Rush hour 7–8am: about 38 minutes', color: '#EF4444' },
    ],
  },
};

export const skills = {
  stats: [
    { n: '30+',  l: 'Skills ready to use' },
    { n: '0',    l: 'Lines of code needed' },
    { n: '5-10', l: 'Minutes to set up' },
    { n: '24/7', l: 'Always on' },
  ],

  eyebrow: 'Your Agent is fluent in',
  title: 'More than 30 HR workflows,',
  titleAccent: 'end to end',
  titleNoWrap: false, // tiêu đề EN dài hơn bản VI, ép nowrap sẽ tràn ngang trên mobile
  sub: 'Hand it any HR task — the Agent knows how to do it. Nothing is off limits.',

  categories: [
    {
      cat: '🎯 Recruiting',
      items: ['Write JDs', 'Screen & score CVs', 'Interview questions', 'Candidate scorecards', 'Job ads', 'Candidate nurture emails'],
    },
    {
      cat: '📋 Onboarding',
      items: ['First-day checklist', '30/60/90 day plan', 'Welcome email', 'Buddy & mentor assignment', 'First-week KPIs'],
    },
    {
      cat: '💰 Comp & Ben',
      items: ['Offer letters', 'Salary band analysis', 'Bonus structures', 'Benefits models', 'Equity & ESOP'],
    },
    {
      cat: '📈 Performance',
      items: ['KPI frameworks', 'Review templates', 'Calibration prep', 'PIP action plans', '360° feedback'],
    },
    {
      cat: '📢 HR Communications',
      items: ['Internal announcements', 'Policy drafts', 'Company-wide emails', 'Employer branding posts'],
    },
    {
      cat: '📊 Reporting & Analytics',
      items: ['Headcount snapshot', 'Attrition report', 'Diversity metrics', 'Flight risk analysis', 'Monthly HR report'],
    },
  ],

  cta: { href: '/docs/bi-kip/xay-dung-tro-ly-nhan-su-cua-rieng-ban', label: 'Start building your Agent →' },
  ctaNote: 'Simple · No coding required · Guide in Vietnamese',
};

export const leadForm = {
  title: 'Rather not build it yourself?',
  subtitle: 'Send a message — free advice, or we build the whole thing for you.',
  iframeTitle: 'Lười HR consultation form',
};
