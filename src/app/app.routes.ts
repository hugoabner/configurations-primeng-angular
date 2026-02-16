import { Routes } from '@angular/router';
import { DashboardLayout } from './layout-page/dashboard-layout/dashboard-layout';

export const routes: Routes = [
  {
    path: '',
    component: DashboardLayout,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'polizas' },
      {
        path: 'polizas',
        loadComponent: () => import('./features/import-poliza/poliza/poliza').then((m) => m.Poliza),
      },
      // Opción A: 404 dentro del Layout
      {
        path: 'not-found',
        loadComponent: () => import('./features/not-found/not-found').then(m => m.NotFound)
      },
    ],
  },
  // Opción B: 404 fuera del Layout (Pantalla completa)
  {
    path: '**',
    redirectTo: 'not-found' // O carga directamente el componente aquí
  }
];