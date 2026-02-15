import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Button } from "primeng/button";
import { take } from 'rxjs';
import { MENU_ITEMS } from '../../../../../core/constants/sidebar-constants';
import { SidebarService } from '../../../../../core/services/sidebar-service/sidebar-service';
import { SidebarNavigation } from '../sidebar-navigation/sidebar-navigation';

@Component({
  selector: 'app-sidebar-main',
  imports: [CommonModule, SidebarNavigation, Button],
  templateUrl: './sidebar-main.html',
  styleUrl: './sidebar-main.css',
})
export class SidebarMain {
  desktopOpen = true;
  mobileOpen = false;
  menuItems = MENU_ITEMS;

  constructor(private readonly _sidebarService: SidebarService) {
    this._sidebarService.desktopOpen$.pipe(take(1)).subscribe((v) => (this.desktopOpen = v));
    this._sidebarService.desktopOpen$.subscribe((v) => (this.desktopOpen = v));
    this._sidebarService.mobileOpen$.subscribe((v) => (this.mobileOpen = v));
  }

  /**
   * closeMobile
   */
  public closeMobile() {
    this._sidebarService.setMobile(false);
  }
}
