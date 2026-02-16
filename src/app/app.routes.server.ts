import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'polizas',
    renderMode: RenderMode.Server,
  },
  {
    path: '**', // Captura cualquier otra ruta (incluida la raíz)
    renderMode: RenderMode.Server,
  },
];
