import { Component, computed, inject, signal } from '@angular/core';
import { Router, NavigationEnd, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs/operators';
import { UserSearchService } from './core/services/user-search.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [RouterOutlet,],
})
export class AppComponent {
  private router = inject(Router);
  userSearch = inject(UserSearchService);

  currentUrl = signal<string>('/');
  showUserSearch = computed(() => {
    const url = this.currentUrl();
    return url === '/' || url.startsWith('/users');
  });

  constructor() {
    this.currentUrl.set(this.router.url || '/');

    this.router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe(e => {
        this.currentUrl.set(e.urlAfterRedirects || e.url || '/');
      });
  }
}
