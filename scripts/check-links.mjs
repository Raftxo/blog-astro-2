import { existsSync } from 'node:fs';
import { readdir, readFile } from 'node:fs/promises';
import { extname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const distDir = fileURLToPath(new URL('../dist', import.meta.url));
const base = (process.env.BASE_PATH ?? '/blog-astro-2').replace(/\/+$/, '');

async function walk(directory) {
	const entries = await readdir(directory, { withFileTypes: true });
	const files = [];
	for (const entry of entries) {
		const fullPath = join(directory, entry.name);
		if (entry.isDirectory()) files.push(...(await walk(fullPath)));
		else if (entry.isFile() && extname(entry.name) === '.html') files.push(fullPath);
	}
	return files;
}

function targetFor(pathname) {
	const clean = decodeURI(pathname.split('?')[0].split('#')[0]);
	if (clean === base || clean === `${base}/`) return join(distDir, 'index.html');

	const relative = clean.startsWith(`${base}/`)
		? clean.slice(base.length + 1)
		: clean.replace(/^\/+/, '');
	if (!relative) return join(distDir, 'index.html');
	if (relative.endsWith('/')) return join(distDir, relative, 'index.html');
	if (extname(relative)) return join(distDir, relative);

	const asDirectory = join(distDir, relative, 'index.html');
	const asFile = join(distDir, `${relative}.html`);
	return existsSync(asDirectory) ? asDirectory : asFile;
}

const htmlFiles = await walk(distDir);
const missing = new Set();

for (const file of htmlFiles) {
	const html = await readFile(file, 'utf8');
	for (const match of html.matchAll(/\b(?:href|src)="([^"]+)"/g)) {
		const href = match[1].replaceAll('&amp;', '&');
		if (!href.startsWith(base)) continue;
		const target = targetFor(href);
		if (!existsSync(target)) missing.add(`${file.replace(distDir, 'dist')} -> ${href}`);
	}
}

if (missing.size > 0) {
	console.error(`Enlaces internos rotos: ${missing.size}`);
	for (const item of missing) console.error(`  ${item}`);
	process.exit(1);
}

console.log(`check-links: ${htmlFiles.length} páginas revisadas, sin enlaces internos rotos.`);
