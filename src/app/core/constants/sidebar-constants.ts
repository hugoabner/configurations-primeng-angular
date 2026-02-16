type MenuItem = {
  readonly label: string;
  readonly icon?: string; // Opcional si no todos los elementos tienen íconos
  readonly route?: string; // Opcional si algunos elementos no tienen rutas
  readonly exact: boolean;
  readonly submenus: { label: string; route: string }[]; // Siempre un array, aunque vacío
};
export const MENU_ITEMS: MenuItem[] = [
  {
    label: 'Inicio',
    icon: 'pi pi-home',
    route: '/home',
    exact: true,
    submenus: [],
  },
  {
    label: 'Polizas',
    icon: 'pi pi-file',
    route: '/polizas',
    exact: false,
    submenus: [],
  }
  // {
  //   label: 'Configuración',
  //   icon: 'fas fa-cog',
  //   // route: '/#',
  //   exact: false,
  //   submenus: [
  //     { label: 'General', route: '/configuracion/general' },
  //     { label: 'Seguridad', route: '/configuracion/seguridad' },
  //   ],
  // },
  // {
  //   label: 'Productos',
  //   icon: 'fas fa-box',
  //   exact: false,
  //   // route: '/#',
  //   submenus: [
  //     { label: 'Lista de Productos', route: '/productos/lista' },
  //     { label: 'Categorías', route: '/productos/categorias' },
  //     { label: 'Inventario', route: '/productos/inventario' },
  //   ],
  // },
  // {
  //   label: 'Ventas',
  //   icon: 'fas fa-shopping-cart',
  //   // route: '/#',
  //   exact: false,
  //   submenus: [
  //     { label: 'Historial de Ventas', route: '/ventas/historial' },
  //     { label: 'Reportes', route: '/ventas/reportes' },
  //   ],
  // },
  // {
  //   label: 'Clientes',
  //   exact: false,
  //   icon: 'fas fa-user-friends',
  //   route: '/home',
  //   submenus: [], // SIN submenús
  // },
  // {
  //   label: 'Proveedores',
  //   icon: 'fas fa-truck',
  //   exact: false,
  //   // route: '/#',
  //   submenus: [
  //     { label: 'Lista de Proveedores', route: '/proveedores/lista' },
  //     { label: 'Contactos', route: '/proveedores/contactos' },
  //   ],
  // },
  // {
  //   label: 'Compras',
  //   icon: 'fas fa-shopping-bag',
  //   route: '/compras',
  //   exact: false,
  //   submenus: [], // SIN submenús
  // },
  // {
  //   label: 'Finanzas',
  //   icon: 'fas fa-wallet',
  //   exact: false,
  //   // route: '/#',
  //   submenus: [
  //     { label: 'Cuentas por Pagar', route: '/finanzas/cuentas-pagar' },
  //     { label: 'Cuentas por Cobrar', route: '/finanzas/cuentas-cobrar' },
  //     { label: 'Balance General', route: '/finanzas/balance' },
  //   ],
  // },
  // {
  //   label: 'Reportes',
  //   icon: 'fas fa-chart-line',
  //   exact: false,
  //   route: '/reportes',
  //   submenus: [], // SIN submenús
  // },
  // {
  //   label: 'Soporte',
  //   icon: 'fas fa-life-ring',
  //   exact: false,
  //   // route: '/#',
  //   submenus: [
  //     { label: 'Tickets', route: '/soporte/tickets' },
  //     { label: 'FAQ', route: '/soporte/faq' },
  //   ],
  // },
  // {
  //   label: 'Notificaciones',
  //   icon: 'fas fa-bell',
  //   exact: false,
  //   route: '/notificaciones',
  //   submenus: [], // SIN submenús
  // },
  // {
  //   label: 'Logs del Sistema',
  //   icon: 'fas fa-database',
  //   exact: false,
  //   route: '/logs',
  //   submenus: [], // SIN submenús
  // },
];
