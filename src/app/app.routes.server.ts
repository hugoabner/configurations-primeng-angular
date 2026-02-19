import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'polizas',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'not-found', // Prerenderizamos la página de error para que sea instantánea
    renderMode: RenderMode.Prerender
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender 
  }
];