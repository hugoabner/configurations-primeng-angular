import { Routes } from '@angular/router';
import { DashboardLayout } from './layouts/dashboard-layout/dashboard-layout';

export const routes: Routes = [
  // si la ruta es vacía, redirige a 'polizas' dentro del DashboardLayout
  { path: '', pathMatch: 'full', redirectTo: 'polizas' },
  {
    path: '',
    component: DashboardLayout,
    children: [
      {
        // si es full: la ruta debe coincidir exactamente con 'polizas' para cargar el componente Poliza.
        // si es prefix: cualquier ruta que comience con 'polizas' (como 'polizas/details') también cargaría el componente Poliza, lo cual podría no ser deseado.
        // pathMatch: 'full', // | prefix
        title: 'Pólizas | Karlos Seguros',
        path: 'polizas',
        loadComponent: () =>
          import('./features/process-features/import-poliza-process-feature/poliza/poliza').then(
            (m) => m.Poliza,
          ),
      },
      // Opción A: 404 dentro del Layout
      {
        title: 'Página no encontrada | Karlos Seguros',
        path: 'not-found',
        loadComponent: () => import('./features/not-found/not-found').then((m) => m.NotFound),
      },
    ],
  },
  // si la ruta no coincide con ninguna de las anteriores, redirige a 'not-found' para mostrar la página de error
  { path: '**', redirectTo: 'not-found' },
];
