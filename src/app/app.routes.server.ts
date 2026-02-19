import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  // 1. Prerenderizar el Dashboard y Home (son estáticas)
  {
    path: 'polizas',
    renderMode: RenderMode.Prerender
  },
  // {
  //   path: 'home',
  //   renderMode: RenderMode.Prerender
  // },
  // 2. Si tienes rutas con parámetros (ej: /poliza/:id), usa Server (SSR)
  // porque no conoces los IDs en tiempo de compilación.
  // {
  //   path: 'home/forms',
  //   renderMode: RenderMode.Prerender
  // },
  // 3. Fallback para el resto (opcional)
  {
    path: '**',
    renderMode: RenderMode.Prerender 
  }
];