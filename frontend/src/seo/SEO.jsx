import { useEffect } from 'react';
import { SITE } from '../config/site';

function upsertMeta(attribute, value, content) {
  let element = document.head.querySelector(`meta[${attribute}="${value}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, value);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
}

function upsertLink(rel, href) {
  let element = document.head.querySelector(`link[rel="${rel}"]`);
  if (!element) {
    element = document.createElement('link');
    element.setAttribute('rel', rel);
    document.head.appendChild(element);
  }
  element.setAttribute('href', href);
}

export default function SEO({
  title,
  description,
  path = '/',
  image = SITE.logo,
  type = 'website',
  noindex = false,
  breadcrumbs = [],
}) {
  useEffect(() => {
    const canonicalUrl = `${SITE.url}${path === '/' ? '/' : path}`;
    const fullTitle = title.includes('The Gladiators')
      ? title
      : `${title} | ${SITE.name} Kalu Khan`;

    document.title = fullTitle;

    upsertMeta('name', 'description', description);
    upsertMeta('name', 'robots', noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large');
    upsertMeta('property', 'og:title', fullTitle);
    upsertMeta('property', 'og:description', description);
    upsertMeta('property', 'og:type', type);
    upsertMeta('property', 'og:url', canonicalUrl);
    upsertMeta('property', 'og:image', image);
    upsertMeta('property', 'og:site_name', SITE.name);
    upsertMeta('name', 'twitter:card', 'summary_large_image');
    upsertMeta('name', 'twitter:title', fullTitle);
    upsertMeta('name', 'twitter:description', description);
    upsertMeta('name', 'twitter:image', image);

    upsertLink('canonical', canonicalUrl);

    const oldSchema = document.getElementById('page-seo-schema');
    if (oldSchema) oldSchema.remove();

    const graph = [
      {
        '@type': 'WebSite',
        '@id': `${SITE.url}/#website`,
        url: SITE.url,
        name: SITE.name,
        description,
        inLanguage: 'en',
      },
    ];

    if (breadcrumbs.length) {
      graph.push({
        '@type': 'BreadcrumbList',
        itemListElement: breadcrumbs.map((item, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: item.name,
          item: `${SITE.url}${item.path}`,
        })),
      });
    }

    const schema = document.createElement('script');
    schema.id = 'page-seo-schema';
    schema.type = 'application/ld+json';
    schema.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@graph': graph,
    });
    document.head.appendChild(schema);

    return () => {
      const current = document.getElementById('page-seo-schema');
      if (current) current.remove();
    };
  }, [title, description, path, image, type, noindex, breadcrumbs]);

  return null;
}
