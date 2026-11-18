---
title: 'Construir con Astro'
description: 'Cómo está montado este sitio y por qué eligí contenido en archivos en lugar de una base de datos.'
pubDate: '2026-09-14'
heroImage: '../../assets/hero-construir.jpg'
heroImageAlt: 'Dibujo abstracto en blanco y negro de formas geométricas'
---

Este sitio es un buen ejemplo de por qué me gusta Astro: casi todo es texto, y el texto vive en archivos que puedo leer, mover y versionar con Git.

## La estructura

Las entradas están en `src/content/blog/`. Cada archivo Markdown o MDX lleva un frontmatter con título, descripción, fecha y, opcionalmente, imagen. Un esquema valida esos campos al compilar, así que un typo en una fecha se detecta antes de publicar.

Las rutas se generan desde esa colección: `src/pages/blog/[...slug].astro` crea una página por entrada. No hay que mantener una lista de URLs a mano.

## Un detalle importante

Como el sitio se publica dentro de una subruta (`/blog-astro-2/`), la configuración define `base` y todos los enlaces internos se construyen desde `import.meta.env.BASE_URL`. Es un pequeño precio a pagar por compartir dominio con otros proyectos, y evita enlaces rotos al pasar de local a producción.

## Lo que valoro

- No hay JavaScript en el navegador salvo lo que decido añadir expresamente.
- Las imágenes se optimizan en tiempo de build.
- El RSS y el sitemap salen de los mismos datos que las páginas.

Para un blog personal, menos capas significa menos cosas que se rompen cuando vuelvo a él seis meses después.
