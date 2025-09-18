import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Post {
  userId: number;
  id?: number;
  title: string;
  body: string;
}

@Injectable({ providedIn: 'root' })
export class PostsService {
  private base = 'https://jsonplaceholder.typicode.com';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.base}/posts`);
  }

  getOne(id: number): Observable<Post> {
    return this.http.get<Post>(`${this.base}/posts/${id}`);
  }

  create(payload: Post): Observable<Post> {
    return this.http.post<Post>(`${this.base}/posts`, payload);
  }

  update(id: number, payload: Post): Observable<Post> {
    return this.http.put<Post>(`${this.base}/posts/${id}`, payload);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.base}/posts/${id}`);
  }
}