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
    // Cambiamos a Server para que el servidor de Angular 
    // procese la ruta inexistente y ejecute el { path: '**', redirectTo: 'not-found' }
    renderMode: RenderMode.Server 
  }
];