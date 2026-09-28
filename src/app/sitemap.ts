import { MetadataRoute } from 'next';

// Solo URLs reales del dominio canónico (www). Google no indexa las anclas
// (#seccion) como páginas aparte, y las URLs sin www redirigen: ambas cosas
// hacían que Search Console reportara "Página con redirección".
const BASE = 'https://www.quuantica.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const hoy = new Date();
  return [
    { url: `${BASE}/`, lastModified: hoy, changeFrequency: 'monthly', priority: 1 },
    { url: `${BASE}/politica-privacidad`, lastModified: hoy, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE}/terminos-condiciones`, lastModified: hoy, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE}/tratamiento-datos`, lastModified: hoy, changeFrequency: 'yearly', priority: 0.3 },
  ];
}
