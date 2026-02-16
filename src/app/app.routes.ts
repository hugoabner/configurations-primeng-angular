import { Routes } from '@angular/router';
import { DashboardLayout } from './layout-page/dashboard-layout/dashboard-layout';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'polizas',
    pathMatch: 'full',
  },
  {
    path: '',
    component: DashboardLayout,
    children: [
       {
        path: 'polizas',
        loadComponent: () => import('./features/import-poliza/poliza/poliza').then((m) => m.Poliza),
      },
    ],
  },
];
