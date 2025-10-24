import { Component, inject, signal, computed } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ApiService } from '../../../core/services/api.service';
import { Post } from '../../../core/models/post.model';
import { User } from '../../../core/models/user.model';
import { PostDetailsDialogComponent } from '../../../shared/post-details-dialog/post-details-dialog.component';
import { forkJoin, switchMap } from 'rxjs';


@Component({
  selector: 'app-posts-page',
  imports: [MatDialogModule, MatIconModule, MatButtonModule], // match Todos: mat-icon + mat-icon-button
  templateUrl: './posts-page.component.html',
  styleUrl: './posts-page.component.scss',
})
export class PostsPageComponent {
  private api = inject(ApiService);
  private route = inject(ActivatedRoute);
  private dialog = inject(MatDialog);
  private router = inject(Router);

  userId = signal<number | null>(null);

  posts = signal<Post[]>([]);
  users = signal<User[]>([]);
  loading = signal(true);
  error = signal<string | null>(null);

  userNameById = signal<Record<number, string>>({});

  userName = computed(() => (this.users().length ? this.users()[0].name : ''));

  constructor() {
    this.route.queryParamMap
      .pipe(
        switchMap(pm => {
          const id = pm.get('userId');
          this.userId.set(id ? +id : null);
          this.loading.set(true);
          this.error.set(null);

          if (this.userId()) {
            return forkJoin({
              posts: this.api.getPosts(this.userId()!),
              user: this.api.getUser(this.userId()!),
            });
          } else {
            return forkJoin({
              posts: this.api.getPosts(),
              users: this.api.getUsers(),
            });
          }
        })
      )
      .subscribe({
        next: (data) => {
          if ('posts' in data && 'user' in data) {
            this.posts.set(data.posts);
            this.users.set([data.user]);
          } else {
            this.posts.set(data.posts);
            this.users.set(data.users);
            const map: Record<number, string> = {};
            this.users().forEach(u => (map[u.id] = u.name));
            this.userNameById.set(map);
          }
          this.loading.set(false);
        },
        error: () => {
          this.error.set('Failed to load posts');
          this.loading.set(false);
        },
      });
  }

  goBack() {
    this.router.navigate(['/users']);
  }

  openDetails(p: Post) {
    this.dialog.open(PostDetailsDialogComponent, {
      data: { title: p.title, body: p.body },
      width: 'min(600px, 92vw)',
    });
  }
}
