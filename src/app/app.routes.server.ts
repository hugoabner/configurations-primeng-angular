import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: '', // Agrega la ruta raíz
    renderMode: RenderMode.Server,
  },
  {
    path: 'polizas',
    renderMode: RenderMode.Server,
  },
];
