import { getCollection } from 'astro:content';
import rss from '@astrojs/rss';
import { BASE, SITE_DESCRIPTION, SITE_TITLE } from '../consts';

export async function GET(context) {
	const posts = (await getCollection('blog'))
		.filter((post) => !post.data.draft)
		.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());

	return rss({
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		// El canal apunta a la subruta del proyecto, no a la raíz del dominio.
		site: new URL(BASE, context.site),
		items: posts.map((post) => ({
			title: post.data.title,
			description: post.data.description,
			pubDate: post.data.pubDate,
			link: `${BASE}blog/${post.id}/`,
		})),
	});
}
