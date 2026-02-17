import { SidebarGroup } from '../types/interface-sidebar';

export const MENU_ITEMS: SidebarGroup[] = [
  {
    title: 'Dashboard',
    items: [
      {
        label: 'Polizas',
        href: '/polizas',
        icon: 'pi pi-file',
        exact: true,
        roles: ['ADMIN', 'EMPLOYEE'],
        subItems: [],
      }
    ],
  },
  {
    title: 'Configuración',
    items: [
      {
        label: 'General',
        href: '/configuracion/general',
        icon: 'pi pi-cog',
        exact: true,
        roles: ['ADMIN', 'EMPLOYEE'],
        subItems: [
          {
            label: 'Seguridad',
            href: '/configuracion/seguridad',
            exact: true,
            roles: ['ADMIN', 'EMPLOYEE'],
            subItems: [],
          },
          {
            label: 'Notificaciones',
            href: '/configuracion/notificaciones',
            exact: true,
            roles: ['ADMIN', 'EMPLOYEE'],
            subItems: [],
          },
          {
            label: 'Integraciones',
            href: '/configuracion/integraciones',
            exact: true,
            roles: ['ADMIN', 'EMPLOYEE'],
            subItems: [],
          }
        ],
      }
    ],
  }
]
// {
//   label: 'Inicio',
//   icon: 'pi pi-home',
//   route: '/home',
//   exact: true,
//   submenus: [],
// },
// {
//   label: 'Polizas',
//   icon: 'pi pi-file',
//   route: '/polizas',
//   exact: false,
//   submenus: [],
// },
// {
//   label: 'Configuración',
//   icon: 'pi pi-cog',
//   // route: '/#',
//   exact: false,
//   submenus: [
//     { label: 'General', route: '/configuracion/general' },
//     { label: 'Seguridad', route: '/configuracion/seguridad' },
//   ],
// },
