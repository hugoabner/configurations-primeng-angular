import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  /** Estado para desktop (visible / oculto) */
  private readonly _desktopOpen = new BehaviorSubject<boolean>(true);
  /** crear observable */
  desktopOpen$ = this._desktopOpen.asObservable();

  /** Estado para mobile */
  private readonly _mobileOpen = new BehaviorSubject<boolean>(false);
  /** crear observable */
  mobileOpen$ = this._mobileOpen.asObservable();

  /**
   * metodo para cambiar en valor del estado a False
   */
  public toggleDesktop() {
    this._desktopOpen.next(!this._desktopOpen.value);
  }

  /**
   * name
   */
  public setDesktop(open: boolean) {
    this._desktopOpen.next(open);
  }

  /**
   * name
   */
  public toggleMobile() {
    this._mobileOpen.next(!this._mobileOpen.value);
  }

  /**
   * name
   */
  public setMobile(open: boolean) {
    this._mobileOpen.next(open);
  }
}
