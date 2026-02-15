import { CommonModule } from '@angular/common';
import { Component, ElementRef, inject, Input, OnDestroy } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { TooltipModule } from 'primeng/tooltip';
import { Subscription } from 'rxjs';
import { SidebarService } from '../../../../../core/services/sidebar-service/sidebar-service';

@Component({
  selector: 'app-sidebar-navigation',
  imports: [RouterLink, RouterModule, CommonModule, TooltipModule],
  templateUrl: './sidebar-navigation.html',
  styleUrl: './sidebar-navigation.css',
})
export class SidebarNavigation implements OnDestroy {
  desktopOpen: boolean = true;
  expandedIndex: number | null = null;
  hoveredIndex: number | null = null;
  hoveredItem: any = null;
  dropdownPosition = { left: 0, top: 0 };

  private hoverTimeout: any = null;
  private dropdownHovered = false;
  @Input() menuItems: any[] = [];

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

  public onItemMouseEnter(index: number, event: MouseEvent) {
    if (!this.desktopOpen) {
      // Limpiar timeout anterior
      this.clearHoverTimeout();

      const item = this.menuItems[index];
      this.hoveredIndex = index;
      this.hoveredItem = item;

      // Calcular posición del dropdown
      const target = event.target as HTMLElement;
      const rect = target.getBoundingClientRect();

      // Posición fija similar a React
      this.dropdownPosition = {
        left: rect.right + 8, // 8px de margen
        top: rect.top,
      };
    }
  }

  public onItemMouseLeave() {
    if (!this.desktopOpen) {
      // Retrasar la desaparición para dar tiempo al hover del dropdown
      this.hoverTimeout = setTimeout(() => {
        if (!this.dropdownHovered) {
          this.closeDropdown();
        }
      }, 150);
    }
  }

  public onDropdownMouseEnter() {
    if (!this.desktopOpen) {
      this.clearHoverTimeout();
      this.dropdownHovered = true;
    }
  }

  public onDropdownMouseLeave() {
    if (!this.desktopOpen) {
      this.dropdownHovered = false;
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
    this.hoveredIndex = null;
    this.hoveredItem = null;
    this.dropdownHovered = false;
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
