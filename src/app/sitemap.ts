import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://kkpatilparamedical.in';
  
  const routes = [
    '',
    '/about',
    '/courses',
    '/admissions',
    '/facilities',
    '/gallery',
    '/news',
    '/disclosure',
    '/contact',
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));
}
