import { Injectable, computed, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class UserSearchService {
value() {
throw new Error('Method not implemented.');
}
  readonly search = signal('');
  readonly term = computed(() => this.search().trim().toLowerCase());

  set(v: string) { this.search.set(v); }
  clear() { this.search.set(''); }
}
