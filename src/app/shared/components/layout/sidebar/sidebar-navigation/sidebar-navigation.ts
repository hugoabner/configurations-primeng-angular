import { CommonModule } from '@angular/common';
import { Component, ElementRef, inject, Input, OnDestroy, signal } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { TooltipModule } from 'primeng/tooltip';
import { Subscription } from 'rxjs';
import { SidebarService } from '../../../../../core/services/sidebar-service/sidebar-service';
type MenuItem = {
  readonly label: string;
  readonly icon?: string; // Opcional si no todos los elementos tienen íconos
  readonly route?: string; // Opcional si algunos elementos no tienen rutas
  readonly exact: boolean;
  readonly submenus: { label: string; route: string }[]; // Siempre un array, aunque vacío
};
@Component({
  selector: 'app-sidebar-navigation',
  imports: [RouterLink, RouterModule, CommonModule, TooltipModule],
  templateUrl: './sidebar-navigation.html',
  styleUrl: './sidebar-navigation.css',
})
export class SidebarNavigation implements OnDestroy {
  desktopOpen: boolean = true;
  // variable para controlar qué item está expandido (si es que hay alguno)
  expandedIndex: number | null = null;
  // indice del item actualmente hovered para mostrar el dropdown
  hoveredIndex: number | null = null;
  // item actualmente hovered para mostrar el dropdown
  hoveredItem = signal<MenuItem | null>(null);
  dropdownPosition = { left: 0, top: 0 };

  // Timeout para cerrar el dropdown después de un breve retraso
  private hoverTimeout: any = null;
  // Variable para controlar si el mouse está sobre el dropdown
  // signal para controlar si el mouse esta sobre el dropdown
  dropdownHovered = signal<boolean>(false);
  
  @Input() menuItems: MenuItem[] = [];

  readonly _sidebarService = inject(SidebarService);
  private subscription: Subscription = new Subscription();

  constructor(
    private router: Router,
    private elementRef: ElementRef,
  ) {
    this.subscription = this._sidebarService.desktopOpen$.subscribe((isOpen: boolean) => {
      this.desktopOpen = isOpen;
      if (!isOpen) {
        this.expandedIndex = null;
        this.closeDropdown();
      }
    });
  }

  // cuando el mouse entra a un item, mostrar el dropdown si no estamos en desktop
  public onItemMouseEnter(index: number, event: MouseEvent) {
    if (!this.desktopOpen) {
      // Limpiar timeout anterior
      this.clearHoverTimeout();

      const item = this.menuItems[index];
      this.hoveredIndex = index;
      this.hoveredItem.set(item);

      // Calcular posición del dropdown
      const target = event.target as HTMLElement;
      // console.log("Target:", target);
      const rect = target.getBoundingClientRect();

      // Posición fija similar a React
      this.dropdownPosition = {
        left: rect.right + 8, // 8px de margen
        top: rect.top,
      };
    }
  }

  // cuando el mouse sale de un item, ocultar el dropdown después de un breve retraso (para dar tiempo al hover del dropdown)
  public onItemMouseLeave() {
    if (!this.desktopOpen) {
      // Retrasar la desaparición para dar tiempo al hover del dropdown
      this.hoverTimeout = setTimeout(() => {
        if (!this.dropdownHovered()) {
          this.closeDropdown();
        }
      }, 150);
    }
  }

  public onDropdownMouseEnter() {
    if (!this.desktopOpen) {
      this.clearHoverTimeout();
      this.dropdownHovered.set(true);
    }
  }

  public onDropdownMouseLeave() {
    if (!this.desktopOpen) {
      this.dropdownHovered.set(false);
      this.hoverTimeout = setTimeout(() => {
        this.closeDropdown();
      }, 100);
    }
  }

  private clearHoverTimeout() {
    if (this.hoverTimeout) {
      clearTimeout(this.hoverTimeout);
      this.hoverTimeout = null;
    }
  }

  public closeDropdown() {
    // indice del item actualmente hovered
    this.hoveredIndex = null;
    this.hoveredItem.set(null);
    this.dropdownHovered.set(false);
    this.clearHoverTimeout();
  }

  public toggleSubmenu(index: number): void {
    if (this.expandedIndex === index) {
      this.expandedIndex = null;
    } else {
      this.expandedIndex = index;
    }
  }

  public closeSubmenu() {
    this.expandedIndex = null;
  }

  public navigateAndClose(item: any): void {
    // if (item.submenus && item.submenus.length > 0 && this.desktopOpen) {
    if (item.submenus && this.desktopOpen) {
      const index = this.menuItems.findIndex((i) => i === item);
      this.toggleSubmenu(index);
    } else if (item.route && (!item.submenus || item.submenus.length === 0)) {
      this.router.navigate([item.route]);
      if (!this.desktopOpen) {
        this.closeDropdown();
      }
    }
  }

  public isLinkActive(route: string): boolean {
    if (!route) return false;
    return this.router.isActive(route, {
      paths: 'exact',
      queryParams: 'ignored',
      fragment: 'ignored',
      matrixParams: 'ignored',
    });
  }
  /**
   * name
   */
  public isSubmenuActive(submenus: { label: string; route: string }[]): boolean {
    return submenus.some((submenu) => this.isLinkActive(submenu.route));
  }
  ngOnDestroy(): void {
    this.clearHoverTimeout();
    this.subscription.unsubscribe();
  }
}
