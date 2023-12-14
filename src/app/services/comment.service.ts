import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { PostComment } from '../models/comments';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  private readonly apiUrl = environment.apiURL;

  constructor(private http: HttpClient) {}

  getCommentsForPost(postId: number) {
    return this.http.get<PostComment[]>(
      `${this.apiUrl}/comments?postId=${postId}`
    );
  }

  getAllComments() {
    return this.http.get<PostComment[]>(`${this.apiUrl}/comments`);
  }

  deleteComment(commentId: number) {
    return this.http.delete(`${this.apiUrl}/comments/${commentId}`);
  }

  createComment(comment: PostComment) {
    return this.http.post(`${this.apiUrl}/comments`, comment);
  }
}
