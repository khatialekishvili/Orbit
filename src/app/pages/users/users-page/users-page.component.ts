import { Component, computed, effect, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../../core/services/api.service';
import { User } from '../../../core/models/user.model';
import { HoverAnimateDirective } from '../../../core/directives/hover-animate.directive';
import { UserSearchService } from '../../../core/services/user-search.service';

@Component({
  selector: 'app-users-page',
  imports: [HoverAnimateDirective],
  templateUrl: './users-page.component.html',
  styleUrl: './users-page.component.scss'
})
export class UsersPageComponent {
  private api = inject(ApiService);
  private router = inject(Router);
  userSearch = inject(UserSearchService);

  users   = signal<User[]>([]);
  loading = signal(true);
  error   = signal<string | null>(null);

  constructor() {
    this.api.getUsers().subscribe({
      next: d => { this.users.set(d); this.loading.set(false); },
      error: () => { this.error.set('Failed to load users'); this.loading.set(false); }
    });

    effect(() => {
      console.debug('search=', this.userSearch.search(), 'matches=', this.filtered().length);
    });
  }

  first = (n: string) => (n ?? '').split(' ')[0] ?? '';
  last  = (n: string) => (n ?? '').split(' ').slice(1).join(' ') ?? '';

  filtered = computed(() => {
    const term = this.userSearch.term();    
    const list = this.users();
    if (!term) return list;
    return list.filter(u =>
      (u.name  ?? '').toLowerCase().includes(term) ||
      (u.email ?? '').toLowerCase().includes(term)
    );
  });

  hasSearched = computed(() => this.userSearch.search().trim().length > 0);

  goPosts(id: number){ this.router.navigate(['/posts'], { queryParams: { userId: id } }); }
  goTodos(id: number){ this.router.navigate(['/todos', id]); }
}
