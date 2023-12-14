import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from 'src/app/models/post';
import { PostService } from 'src/app/services/post.service';
import { CommentService } from 'src/app/services/comment.service';
import { PostComment } from 'src/app/models/comments';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  post: Post | undefined;
  comments!: any;
  commentForm: PostComment = {
    postId: Number(this.route.snapshot.params['id']),
    body: '',
    id: 0,
    userId: 0,
  };
  constructor(
    private postSrv: PostService,
    private route: ActivatedRoute,
    private commentSrv: CommentService,
    private userSrv: UserService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const postId = Number(params.get('id'));
      if (!isNaN(postId)) {
        this.postSrv.getPost(postId).subscribe((post) => {
          this.post = post;
          this.getComments(postId);
        });
      }
    });
  }

  createComment(comment: PostComment) {
    let utente = this.userSrv.getUserFromLocalStorage();
    if (utente) {
      let userId = utente.user.id;
      this.commentForm.userId = userId;
    }
    this.commentSrv.createComment(comment).subscribe(() => {
      this.getComments(this.commentForm.postId);
    });
  }

  getComments(postId: number): void {
    this.commentSrv.getCommentsForPost(postId).subscribe((comments) => {
      this.comments = comments;
    });
  }

  speakText(text: string): void {
    if ('speechSynthesis' in window) {
      const textRead = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(textRead);
    } else {
      console.error('Text-to-speech non supportato.');
    }
  }

  ngOnDestroy(): void {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }
}
