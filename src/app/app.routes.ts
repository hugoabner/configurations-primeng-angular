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
        path: 'polizas',
        title: 'Pólizas | Karlos Seguros',
        loadComponent: () =>
          import('./features/process-features/import-poliza-process-feature/poliza/poliza').then(
            (m) => m.Poliza,
          ),
      },
      {
        path: 'not-found',
        loadComponent: () =>
          import('./features/not-found/not-found').then((m) => m.NotFound),
      },
    ],
  },
  { path: '**', redirectTo: 'not-found' }
];
