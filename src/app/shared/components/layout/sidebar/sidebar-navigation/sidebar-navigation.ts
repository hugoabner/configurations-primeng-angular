import { CommonModule } from '@angular/common';
import { Component, ElementRef, inject, Input, OnDestroy, signal } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { TooltipModule } from 'primeng/tooltip';
import { Subscription } from 'rxjs';
import { NavItem, SidebarGroup } from '../../../../../core/interfaces/interface-sidebar';
import { SidebarService } from '../../../../../core/services/sidebar-service/sidebar-service';
import { SidebarSubmenu } from "../sidebar-submenu/sidebar-submenu";
type MenuItem = {
  readonly label: string;
  readonly icon?: string; // Opcional si no todos los elementos tienen íconos
  readonly route?: string; // Opcional si algunos elementos no tienen rutas
  readonly exact: boolean;
  readonly submenus: { label: string; route: string }[]; // Siempre un array, aunque vacío
};
@Component({
  selector: 'app-sidebar-navigation',
  imports: [RouterLink, RouterModule, CommonModule, TooltipModule, SidebarSubmenu],
  templateUrl: './sidebar-navigation.html',
  styleUrl: './sidebar-navigation.css',
})
export class SidebarNavigation implements OnDestroy {
  desktopOpen: boolean = true;
  
  // Variables para controlar expansión en modo desktop
  expandedItems: Set<string> = new Set<string>();
  
  // Variables para dropdown flotante en modo collapsed
  hoveredItem = signal<NavItem | null>(null);
  hoveredItemPath = signal<string>('');
  dropdownPosition = { left: 0, top: 0 };
  dropdownHovered = signal<boolean>(false);
  
  private hoverTimeout: any = null;
  
  @Input() menuGroups: SidebarGroup[] = [];

  readonly _sidebarService = inject(SidebarService);
  private subscription: Subscription = new Subscription();

  constructor(
    private router: Router,
    private elementRef: ElementRef,
  ) {
    this.subscription = this._sidebarService.desktopOpen$.subscribe((isOpen: boolean) => {
      this.desktopOpen = isOpen;
      if (!isOpen) {
        this.expandedItems.clear();
        this.closeDropdown();
      }
    });
  }

  // Cuando el mouse entra a un item en modo collapsed
  public onItemMouseEnter(item: NavItem, event: MouseEvent, path: string = '') {
    if (!this.desktopOpen) {
      this.clearHoverTimeout();

      this.hoveredItem.set(item);
      this.hoveredItemPath.set(path);

      // Calcular posición del dropdown
      const target = event.currentTarget as HTMLElement;
      const rect = target.getBoundingClientRect();

      this.dropdownPosition = {
        left: rect.right + 8,
        top: rect.top,
      };
    }
  }

  public onItemMouseLeave() {
    if (!this.desktopOpen) {
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
    this.hoveredItem.set(null);
    this.hoveredItemPath.set('');
    this.dropdownHovered.set(false);
    this.clearHoverTimeout();
  }

  // Toggle para submenús en modo desktop
  public toggleSubmenu(item: NavItem, event?: MouseEvent) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    
    if (this.hasSubItems(item)) {
      const key = this.getItemKey(item);
      if (this.expandedItems.has(key)) {
        this.expandedItems.delete(key);
      } else {
        this.expandedItems.add(key);
      }
    }
  }

  public isExpanded(item: NavItem): boolean {
    return this.expandedItems.has(this.getItemKey(item));
  }

  private getItemKey(item: NavItem): string {
    return item.href || item.label;
  }

  public hasSubItems(item: NavItem): boolean {
    return !!(item.subItems && item.subItems.length > 0);
  }

  public navigateAndClose(item: NavItem): void {
    if (item.href && !this.hasSubItems(item)) {
      this.router.navigate([item.href]);
      if (!this.desktopOpen) {
        this.closeDropdown();
      }
    }
  }

  public isLinkActive(href: string, exact: boolean = false): boolean {
    if (!href) return false;
    return this.router.isActive(href, {
      paths: exact ? 'exact' : 'subset',
      queryParams: 'ignored',
      fragment: 'ignored',
      matrixParams: 'ignored',
    });
  }

  public isSubmenuActive(item: NavItem): boolean {
    if (!item.subItems) return false;
    
    return item.subItems.some(subItem => {
      if (this.isLinkActive(subItem.href, subItem.exact)) {
        return true;
      }
      if (subItem.subItems) {
        return this.isSubmenuActive(subItem);
      }
      return false;
    });
  }

  public shouldShowItem(item: NavItem): boolean {
    // Aquí puedes implementar lógica de roles
    // Por ahora retornamos true
    return true;
  }

  ngOnDestroy(): void {
    this.clearHoverTimeout();
    this.subscription.unsubscribe();
  }
}