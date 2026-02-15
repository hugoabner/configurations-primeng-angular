import { Routes } from '@angular/router';
import { DashboardLayout } from './layout-page/dashboard-layout/dashboard-layout';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: '',
    component: DashboardLayout,
    children: [
      {
        path: 'home',
        loadComponent: () => import('./features/home-components/home/home').then((m) => m.Home),
      },
       {
        path: 'polizas',
        loadComponent: () => import('./features/import-poliza/poliza/poliza').then((m) => m.Poliza),
      },
    ],
  },
];
