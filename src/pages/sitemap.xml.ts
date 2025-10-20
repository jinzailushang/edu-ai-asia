import type { APIRoute } from 'astro';
import domainsData from '../data/domains.json';
import siteConfig from '../config/site.json';
import type { Domain } from '../types/domain';

const domains = domainsData as Domain[];

export const GET: APIRoute = async () => {
  const baseUrl = siteConfig.siteUrl;
  const currentDate = new Date().toISOString();

  // 静态页面
  const staticPages = [
    { url: '', priority: '1.0', changefreq: 'daily' },
  ];

  // 域名详情页
  const domainPages = domains.map(domain => ({
    url: `/domains/${domain.id}`,
    priority: domain.featured ? '0.9' : '0.8',
    changefreq: 'weekly',
    lastmod: currentDate
  }));

  // 生成 XML
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${staticPages.map(page => `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
    <xhtml:link rel="alternate" hreflang="zh" href="${baseUrl}${page.url}" />
    <xhtml:link rel="alternate" hreflang="en" href="${baseUrl}/en${page.url}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${baseUrl}${page.url}" />
  </url>`).join('\n')}
${domainPages.map(page => `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
    <xhtml:link rel="alternate" hreflang="zh" href="${baseUrl}${page.url}" />
    <xhtml:link rel="alternate" hreflang="en" href="${baseUrl}/en${page.url}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${baseUrl}${page.url}" />
  </url>`).join('\n')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600'
    }
  });
};
