import { MetadataRoute } from 'next';

// Antes no existía robots.txt (respondía una página 404 con noindex).
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/', disallow: ['/api/', '/musica'] },
    sitemap: 'https://www.quuantica.com/sitemap.xml',
    host: 'https://www.quuantica.com',
  };
}
