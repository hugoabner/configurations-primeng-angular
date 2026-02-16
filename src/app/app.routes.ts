import { Routes } from '@angular/router';
import { DashboardLayout } from './layout-page/dashboard-layout/dashboard-layout';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'polizas',
    pathMatch: 'full',
  },
  {
    path: 'polizas',
    component: DashboardLayout,
    loadComponent: () => import('./features/import-poliza/poliza/poliza').then((m) => m.Poliza),
  },
];
