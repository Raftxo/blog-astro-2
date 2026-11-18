import { access, copyFile } from 'node:fs/promises';

// GitHub Pages busca `404.html` en la raíz del sitio. Astro ya lo genera
// directamente en `dist/404.html`, pero si en el futuro cambia a
// `dist/404/index.html` publicamos también una copia en la ruta esperada.
const rootFile = new URL('../dist/404.html', import.meta.url);
const nestedFile = new URL('../dist/404/index.html', import.meta.url);

try {
	await access(rootFile);
	console.log('postbuild: dist/404.html ya existe.');
} catch {
	try {
		await access(nestedFile);
		await copyFile(nestedFile, rootFile);
		console.log('postbuild: dist/404.html creado desde dist/404/index.html.');
	} catch {
		console.log('postbuild: no se encontró una página 404; se omite la copia.');
	}
}
