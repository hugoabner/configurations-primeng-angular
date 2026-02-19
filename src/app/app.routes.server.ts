import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'polizas',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'not-found',
    renderMode: RenderMode.Prerender
  },
  {
    path: '**', 
    renderMode: RenderMode.Prerender 
  }
];