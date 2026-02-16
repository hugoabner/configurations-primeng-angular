import { Routes } from '@angular/router';
import { DashboardLayout } from './layout-page/dashboard-layout/dashboard-layout';

export const routes: Routes = [
  {
    path: '',
    component: DashboardLayout,
    children: [
      {
        path: '', // Maneja el redireccionamiento dentro del layout
        pathMatch: 'full',
        redirectTo: 'polizas',
      },
      {
        path: 'polizas',
        loadComponent: () => import('./features/import-poliza/poliza/poliza').then((m) => m.Poliza),
      },
    ],
  },
];