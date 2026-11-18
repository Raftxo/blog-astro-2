import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
	// Carga archivos Markdown y MDX de `src/content/blog/`.
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	// Valida el frontmatter con un esquema.
	schema: ({ image }) =>
		z
			.object({
				title: z.string(),
				description: z.string(),
				pubDate: z.coerce.date(),
				updatedDate: z.coerce.date().optional(),
				heroImage: image().optional(),
				heroImageAlt: z.string().optional(),
				draft: z.boolean().default(false),
			})
			.superRefine((data, ctx) => {
				if (data.heroImage && !data.heroImageAlt) {
					ctx.addIssue({
						code: 'custom',
						message: 'heroImageAlt es obligatorio cuando hay heroImage.',
						path: ['heroImageAlt'],
					});
				}
				if (data.updatedDate && data.updatedDate < data.pubDate) {
					ctx.addIssue({
						code: 'custom',
						message: 'updatedDate no puede ser anterior a pubDate.',
						path: ['updatedDate'],
					});
				}
			}),
});

export const collections = { blog };
