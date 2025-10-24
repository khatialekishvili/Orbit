import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../core/models/user.model';
import { Post } from '../../core/models/post.model';
import { Todo } from '../../core/models/todo.model';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private http = inject(HttpClient);
  private base = 'https://jsonplaceholder.typicode.com';

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.base}/users`);
  }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(`${this.base}/users/${id}`);
  }

  getPosts(userId?: number): Observable<Post[]> {
    const url = userId ? `${this.base}/posts?userId=${userId}` : `${this.base}/posts`;
    return this.http.get<Post[]>(url);
  }

  getTodos(userId: number): Observable<Todo[]> {
    return this.http.get<Todo[]>(`${this.base}/todos?userId=${userId}`);
  }
}
