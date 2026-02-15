import { Component, HostListener } from '@angular/core';
import { Button } from "primeng/button";
import { SidebarService } from '../../../../../core/services/sidebar-service/sidebar-service';

@Component({
  selector: 'app-sidebar-trigger-main',
  imports: [Button],
  templateUrl: './sidebar-trigger-main.html',
  styleUrl: './sidebar-trigger-main.css',
})
export class SidebarTriggerMain {
  private isDesktop = true;
  constructor(private readonly _sidebarService: SidebarService) {
    this.checkMedia();
  }

  @HostListener('window:resize')
  onResize() {
    this.checkMedia();
  }

  protected checkMedia() {
    // md breakpoint = 768px (ajusta si en tu Tailwind es distinto)
    if (typeof window !== 'undefined') {
      this.isDesktop = window.matchMedia('(min-width: 768px)').matches;
      console.log(this.isDesktop);
    } else {
      this.isDesktop = true; // fallback for SSR or environments without window
    }
  }

  toggle() {
    if (this.isDesktop) {
      this._sidebarService.toggleDesktop();
    } else {
      this._sidebarService.toggleMobile();
    }
  }
}
