import { PUBLIC_TOOLS } from './tools.js';

export const SITE_URL = 'https://luoi-hr.vercel.app';

/**
 * Trang không muốn Google index — loại khỏi sitemap.
 * `/markdown-page` là trang mẫu đi kèm template Docusaurus, chưa bao giờ có nội
 * dung thật; để trong sitemap là tự mời Googlebot đi đọc một trang rỗng.
 * `/certificate/` đã gắn noindex ở chính file HTML (xem static/certificate/index.html)
 * và bị loại tự động vì `index:false` trong tools.js.
 */
const EXCLUDED = ['/markdown-page', '/markdown-page/'];

/**
 * Priority phân tầng theo tầm quan trọng thật, thay vì để plugin gán 0.5 đều nhau.
 * Google coi priority là gợi ý tương đối trong nội bộ site — gán đều nhau thì
 * mất luôn tín hiệu, không giúp được gì.
 */
function priorityFor(path) {
  if (path === '/') return { priority: 1.0, changefreq: 'weekly' };
  if (path === '/en' || path === '/en/') return { priority: 0.9, changefreq: 'weekly' };
  if (path.startsWith('/tools/')) return { priority: 0.9, changefreq: 'monthly' };
  if (path.startsWith('/docs/')) return { priority: 0.8, changefreq: 'weekly' };
  if (path.startsWith('/ung-ho')) return { priority: 0.4, changefreq: 'monthly' };
  return null;
}

/**
 * Plugin sitemap chỉ liệt kê được route React. File .html trong static/ được copy
 * thẳng vào build nên plugin không thấy → phải bù tay. Danh sách lấy từ tools.js
 * (nguồn duy nhất, dùng chung với mega menu) nên thêm tool mới chỉ sửa một file.
 */
export async function createSitemapItems({ defaultCreateSitemapItems, ...rest }) {
  const routes = await defaultCreateSitemapItems(rest);

  const tuned = routes
    .filter((r) => !EXCLUDED.includes(r.url.replace(SITE_URL, '')))
    .map((r) => {
      const tier = priorityFor(r.url.replace(SITE_URL, '') || '/');
      return tier ? { ...r, ...tier } : r;
    });

  // Chỉ bù file tĩnh — trang React đã nằm trong `routes`, khai thêm sẽ trùng URL
  // và Search Console báo lỗi duplicate.
  const staticPages = PUBLIC_TOOLS
    .filter((t) => t.staticFile)
    .map((t) => ({
      url: `${SITE_URL}${t.to}`,
      changefreq: 'monthly',
      priority: t.priority ?? 0.6,
    }));

  // Bản EN của Org Chart là file tĩnh, không nằm trong danh sách tool tiếng Việt
  staticPages.push({ url: `${SITE_URL}/en/org-chart/`, changefreq: 'monthly', priority: 0.7 });

  return [...tuned, ...staticPages];
}
