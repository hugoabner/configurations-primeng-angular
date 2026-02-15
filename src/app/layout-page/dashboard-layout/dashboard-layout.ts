import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Subscription } from 'rxjs';
import { SidebarService } from '../../core/services/sidebar-service/sidebar-service';
import { NavbarDashboard } from '../../shared/components/layout/header/navbar-dashboard/navbar-dashboard';
import { SidebarMain } from '../../shared/components/layout/sidebar/sidebar-main/sidebar-main';

@Component({
  selector: 'dashboard-layout',
  standalone: true,
  imports: [NavbarDashboard, SidebarMain, RouterOutlet, CommonModule],
  template: `
    <div class="h-full w-full">
      <app-sidebar-main />
      <!-- <main class="flex-1 md:ml-60 h-full  bg-green-300"> -->
      <main
        class="transition-all duration-400"
        [ngClass]="
          desktopOpen ? 'flex-1 md:ml-60 h-full' : 'flex-1 md:ml-20 h-full'
        "
      >
        <app-navbar-dashboard />
        <router-outlet />
      </main>
    </div>
  `,
})
export class DashboardLayout implements OnInit, OnDestroy {
  desktopOpen = true;
  private readonly sub = new Subscription();
  private readonly _sidebarService = inject(SidebarService);

  constructor() {}

  ngOnInit() {
    this.sub.add(
      this._sidebarService.desktopOpen$.subscribe((v) => (this.desktopOpen = v))
    );
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}