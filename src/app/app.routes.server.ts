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
    // En producción, las rutas inexistentes suelen manejarse en el cliente
    // o mediante SSR para devolver un código de estado 404 real.
    renderMode: RenderMode.Client 
  }
];