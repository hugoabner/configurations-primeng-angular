import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { NavItem } from '../../../../../core/interfaces/interface-sidebar';

@Component({
  selector: 'app-sidebar-submenu',
  imports: [CommonModule, RouterLink, RouterModule],
  templateUrl: './sidebar-submenu.html',
  styleUrl: './sidebar-submenu.css',
})
export class SidebarSubmenu {
  @Input({ required: true }) item!: NavItem;
  @Input() desktopOpen: boolean = true;
  @Input() level: number = 0;
  @Input() isExpanded: boolean = false;
  
  @Output() navigate = new EventEmitter<NavItem>();
  @Output() toggle = new EventEmitter<NavItem>();

  hasSubItems(): boolean {
    return !!(this.item.subItems && this.item.subItems.length > 0);
  }

  isLinkActive(): boolean {
    // Esta lógica debería venir del componente padre
    // Por simplicidad, aquí asumimos que se maneja en el template
    return false;
  }

  isSubmenuActive(): boolean {
    if (!this.item.subItems) return false;
    return this.item.subItems.some(subItem => {
      // Similar al padre
      return false;
    });
  }
}
