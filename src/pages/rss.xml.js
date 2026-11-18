import rss from '@astrojs/rss';
import { AUTHOR, SITE_TAGLINE, SITE_TITLE } from '../consts';
import { getPublishedPosts } from '../lib/posts';
import { withBase } from '../lib/url';

export async function GET(context) {
	const posts = await getPublishedPosts();
	const year = new Date().getFullYear();

	return rss({
		title: SITE_TITLE,
		description: SITE_TAGLINE,
		// El canal apunta a la subruta del proyecto, no a la raíz del dominio.
		site: new URL(withBase(''), context.site),
		customData: `<language>es</language><copyright>© ${year} ${AUTHOR}</copyright><lastBuildDate>${new Date().toUTCString()}</lastBuildDate>`,
		items: posts.map((post) => ({
			title: post.data.title,
			description: post.data.description,
			pubDate: post.data.pubDate,
			link: withBase(`blog/${post.id}/`),
		})),
	});
}
