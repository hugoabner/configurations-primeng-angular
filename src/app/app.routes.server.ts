import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: '**',
    renderMode: RenderMode.Prerender
  },
  // {
  //   path: 'polizas',
  //   renderMode: RenderMode.Server,
  // },
  //   {
  //   path: 'not-found',
  //   renderMode: RenderMode.Server,
  // },
  // {
  //   path: '', // Agrega la ruta raíz
  //   renderMode: RenderMode.Server,
  // },
  //   {
  //   path: '**', // Este debe estar presente para que coincida con tu rutas de cliente
  //   renderMode: RenderMode.Server,
  // },
];
