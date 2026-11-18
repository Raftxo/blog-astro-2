# Raftxo | The Silent Pulse

Blog personal de Raftxo construido con [Astro](https://astro.build/): entradas en Markdown/MDX, imágenes optimizadas, RSS, sitemap y fuente local Atkinson.

La URL pública es **https://the-silent-pulse.com/blog-astro-2/**. El dominio `the-silent-pulse.com` está configurado en el sitio de usuario (`Raftxo.github.io`) y este repositorio hereda esa configuración como sitio de proyecto; por eso se publica en la subruta `/blog-astro-2/` y **no** debe configurarse un dominio propio en este repo.

> La biografía de _Sobre mí_ y el contenido de las entradas son textos ficticios de ejemplo, listos para sustituir por los reales.

## Comandos

| Comando                | Acción                                                          |
| :--------------------- | :-------------------------------------------------------------- |
| `npm install`          | Instala dependencias                                            |
| `npm run dev`          | Servidor de desarrollo en `http://localhost:4321/blog-astro-2/` |
| `npm run check`        | Comprueba tipos y plantillas Astro                              |
| `npm run build`        | Genera el sitio en `./dist/` y prepara `404.html`               |
| `npm run check:links`  | Revisa los enlaces internos del build                           |
| `npm run format`       | Formatea el código con Prettier                                 |
| `npm run format:check` | Verifica el formato sin escribir                                |
| `npm run preview`      | Previsualiza el build localmente                                |

También puedes usar `astro dev --background`, `astro dev status` y `astro dev stop` para gestionar el servidor en segundo plano.

## Estructura

```text
src/
├── assets/            imágenes y fuentes
├── components/        BaseHead, Header, HeaderLink, SocialLinks, Footer, FormattedDate, PostCard
├── content/blog/      entradas .md y .mdx
├── layouts/           BaseLayout, PageLayout (páginas) y BlogPost (entradas)
├── lib/               helpers de posts y URLs
├── pages/             /, /blog/, /about/, /404/, /rss.xml
├── styles/global.css  estilos globales y listado de entradas
├── consts.ts          título, descripción, autor y BASE
└── content.config.ts  esquema de la colección `blog`
public/                favicons (se sirven bajo /blog-astro-2/)
scripts/               postbuild (404.html), comprobación de enlaces e iconos
.github/workflows/     CI y despliegue en GitHub Pages
astro.config.mjs       `site`, `base` y `trailingSlash`
```

## Añadir una entrada

Crea un archivo en `src/content/blog/` con este frontmatter:

```md
---
title: 'Título de la entrada'
description: 'Resumen corto'
pubDate: '2026-11-18'
updatedDate: '2026-11-20' # opcional
heroImage: '../../assets/hero-silencio.jpg' # opcional
heroImageAlt: 'Descripción de la imagen' # obligatorio si hay heroImage
draft: false # opcional, por defecto false
---
```

Las fechas se escriben en formato ISO (`YYYY-MM-DD`). Las entradas con `draft: true` no aparecen en el listado, en el RSS ni se generan como páginas.

Los enlaces internos se escriben relativos a la raíz del sitio (`/blog/`) y se convierten con `withBase()` (`src/lib/url.ts`); `HeaderLink` y el feed ya lo hacen automáticamente. Para consultar entradas publicadas y ordenadas usa `getPublishedPosts()` (`src/lib/posts.ts`).

## Despliegue

El workflow `.github/workflows/deploy.yml` compila y publica con la acción oficial de Astro en cada push a `master` (también se puede lanzar manualmente desde _Actions_). Antes del build ejecuta `npm run check` y `npm run format:check`. El workflow `ci.yml` repite esas comprobaciones y añade build y revisión de enlaces en cada pull request.

En `github.com/Raftxo/blog-astro-2` → **Settings → Pages**:

- **Source:** GitHub Actions.
- **Custom domain:** dejar vacío. Se hereda del sitio `Raftxo.github.io`.

En el repositorio `Raftxo.github.io` debe estar configurado `the-silent-pulse.com` como dominio personalizado, con los registros DNS que indique GitHub (registros `A`/`ALIAS` para el apex y, si se usa, un CNAME para `www`). Los cambios de DNS pueden tardar hasta 24 horas; después activa _Enforce HTTPS_.

## Créditos y licencia

Basado en el starter oficial [Astro Blog](https://astro.build/) y en el estilo de [Bear Blog](https://github.com/HermanMartinus/bearblog/).

El código se publica bajo [MIT](LICENSE). Los textos e imágenes no se incluyen en esa licencia: las imágenes abstractas de `src/assets/` proceden de [Unsplash](https://unsplash.com/) y se usan bajo la [Unsplash License](https://unsplash.com/license) (y, en el caso de `hero-construir.jpg`, también bajo CC0/dominio público). Créditos a sus autores: [Liana S](https://unsplash.com/photos/WEXLsbwBrKs), [Akira Hojo](https://unsplash.com/photos/m7saoOljNxI), [Neeme, Gunnar](https://unsplash.com/photos/Rz8whmE18wA), [Pawel Czerwinski](https://unsplash.com/photos/4B3m1zRofV8), [Solen Feyissa](https://unsplash.com/photos/MJJ9ik9m3J4) y [Carlos Felipe Ramírez Mesa](https://unsplash.com/photos/8zk5kb_WrnQ).
