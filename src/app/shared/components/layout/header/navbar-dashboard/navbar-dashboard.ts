import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { OverlayBadgeModule } from 'primeng/overlaybadge';
import { SidebarTriggerMain } from '../../sidebar/sidebar-trigger-main/sidebar-trigger-main';

@Component({
  selector: 'app-navbar-dashboard',
  imports: [SidebarTriggerMain, CommonModule, ButtonModule, OverlayBadgeModule],
  templateUrl: './navbar-dashboard.html',
  styleUrl: './navbar-dashboard.css',
})
export class NavbarDashboard {
  isDark = false;
  toggleDarkMode() {
    this.isDark = !this.isDark;
    const element = document.querySelector('html');
    element?.classList.toggle('my-app-dark');
  }
}
