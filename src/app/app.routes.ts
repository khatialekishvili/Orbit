import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./core/layout/layout-shell/layout-shell.component')
        .then(m => m.LayoutShellComponent),
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'users' },

      {
        path: 'users',
        loadComponent: () =>
          import('./pages/users/users-page/users-page.component')
            .then(m => m.UsersPageComponent),
      },
      {
        path: 'posts',
        loadComponent: () =>
          import('./pages/posts/posts-page/posts-page.component')
            .then(m => m.PostsPageComponent),
      },
      {
        path: 'todos/:userId',
        loadComponent: () =>
          import('./pages/todos/todos-page/todos-page.component')
            .then(m => m.TodosPageComponent),
      },
      {
        path: 'promotions',
        loadComponent: () =>
          import('./pages/promotions/promotions-page/promotions-page.component')
            .then(m => m.PromotionsPageComponent),
      },

      { path: '**', redirectTo: 'users' }
    ]
  }
];
