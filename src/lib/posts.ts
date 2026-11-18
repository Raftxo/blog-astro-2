import { getCollection, type CollectionEntry } from 'astro:content';

export type BlogPost = CollectionEntry<'blog'>;

/** Entradas publicadas, de la más reciente a la más antigua. */
export async function getPublishedPosts(): Promise<BlogPost[]> {
	const posts = await getCollection('blog');
	return posts
		.filter((post) => !post.data.draft)
		.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}
