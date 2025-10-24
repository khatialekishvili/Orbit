import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LayoutService {
  private _open = signal(false);
  isOpen = this._open.asReadonly();

  open()  { this._open.set(true); }
  close() { this._open.set(false); }
  toggle(){ this._open.update(v => !v); }
}
