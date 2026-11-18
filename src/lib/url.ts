import { BASE } from '../consts';

/** Convierte una ruta relativa a la raíz del sitio en una ruta bajo BASE. */
export const withBase = (path = '') => `${BASE}${path.replace(/^\/+/, '')}`;

/** Quita BASE del pathname actual para comparar rutas internas. */
export const withoutBase = (pathname: string) =>
	pathname.startsWith(BASE) ? pathname.slice(BASE.length) : pathname;
