import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from '../models/post';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  apiURL = environment.apiURL;
  constructor(private http: HttpClient) {}

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.apiURL}/posts`);
  }

  getPost(id: number): Observable<Post> {
    return this.http.get<Post>(`${this.apiURL}/posts/${id}`);
  }

  createPost(post: Post): Observable<Post> {
    return this.http.post<Post>(`${this.apiURL}/posts`, post);
  }

  updatePost(id: number, post: Post): Observable<Post> {
    return this.http.put<Post>(`${this.apiURL}/posts/${id}`, post);
  }

  getPostsByUserId(userId: number): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.apiURL}/posts/?userId=${userId}`);
  }

  deletePost(id: number): Observable<Post> {
    return this.http.delete<Post>(`${this.apiURL}/posts/${id}`);
  }

  banPosts(userId: number): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.apiURL}/posts?userId=${userId}`);
  }
}
