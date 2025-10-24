import { Component, OnInit, OnDestroy, inject, signal, computed } from '@angular/core';
import { Router, NavigationEnd, RouterModule } from '@angular/router';
import { filter } from 'rxjs/operators';
import { UserSearchService } from '../../services/user-search.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { LayoutService } from '../layout.service';

@Component({
  selector: 'app-header',
  imports: [MatToolbarModule, RouterModule, ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit, OnDestroy {
  private router = inject(Router);
  private layout = inject(LayoutService);
  userSearch = inject(UserSearchService);

toggleMenu() { this.layout.toggle(); }

  currentUrl = signal<string>('/');
  showUsersUI = computed(() => {
    const url = this.currentUrl();
    return url === '/' || url.startsWith('/users');
  });

  now = signal<Date>(new Date());
  private timerId: any;

  ngOnInit() {
    this.currentUrl.set(this.router.url || '/');
    this.router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe(e => this.currentUrl.set(e.urlAfterRedirects || e.url || '/'));
    this.timerId = setInterval(() => this.now.set(new Date()), 1000);
  }
  ngOnDestroy() { clearInterval(this.timerId); }

  get dateStr() {
    const d = this.now();
    return d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: '2-digit' });
  }
  get timeStr() {
    const d = this.now();
    return d.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  }

  clearSearch() { this.userSearch.set(''); }

  imagePath: string = 'images/logo.svg';
}
