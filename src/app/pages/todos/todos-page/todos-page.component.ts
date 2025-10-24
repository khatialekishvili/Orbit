import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../core/services/api.service';
import { Todo } from '../../../core/models/todo.model';
import { User } from '../../../core/models/user.model';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-todos-page',
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './todos-page.component.html',
  styleUrl: './todos-page.component.scss'
})
export class TodosPageComponent {
  private api = inject(ApiService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  userId  = signal<number>(0);
  user    = signal<User | null>(null);
  todos   = signal<Todo[]>([]);
  loading = signal(true);
  error   = signal<string | null>(null);

  constructor() {
    this.route.paramMap.subscribe(pm => {
      const id = Number(pm.get('userId'));
      this.userId.set(id);
      this.fetchUserAndTodos(id);
    });
  }

  private fetchUserAndTodos(id: number) {
    this.loading.set(true);
    this.error.set(null);

    this.api.getUsers().subscribe({
      next: (users) => this.user.set(users.find(u => u.id === id) || null),
      error: () => this.user.set(null)
    });

    this.api.getTodos(id).subscribe({
      next: d => { this.todos.set(d); this.loading.set(false); },
      error: () => { this.error.set('Failed to load todos'); this.loading.set(false); }
    });
  }

  goBack() { this.router.navigate(['/users']); }
}
