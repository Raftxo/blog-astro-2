import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const svgPath = fileURLToPath(new URL('../public/favicon.svg', import.meta.url));
const icoPath = fileURLToPath(new URL('../public/favicon.ico', import.meta.url));
const applePath = fileURLToPath(new URL('../public/apple-touch-icon.png', import.meta.url));

const svg = await readFile(svgPath);
const png = await sharp(svg).resize(32, 32).png().toBuffer();

// ICO con un único PNG de 32×32 (soportado por navegadores modernos).
const header = Buffer.alloc(6);
header.writeUInt16LE(0, 0);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(1, 4);

const entry = Buffer.alloc(16);
entry[0] = 32;
entry[1] = 32;
entry[2] = 0;
entry[3] = 0;
entry.writeUInt16LE(1, 4);
entry.writeUInt16LE(32, 6);
entry.writeUInt32LE(png.length, 8);
entry.writeUInt32LE(22, 12);

await writeFile(icoPath, Buffer.concat([header, entry, png]));
await sharp(svg).resize(180, 180).png().toFile(applePath);

console.log('generate-icons: favicon.ico y apple-touch-icon.png actualizados.');
