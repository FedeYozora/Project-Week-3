import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import { Post } from 'src/app/models/post';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent implements OnInit {
  post: Post = {
    id: 0,
    title: '',
    body: '',
    userId: 0,
  };
  id!: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private postService: PostService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.postService.getPost(this.id).subscribe((data) => {
      this.post = data;
    });
  }

  updatePost(): void {
    this.postService
      .updatePost(this.id, this.post)
      .pipe(catchError((error) => throwError(error)))
      .subscribe(() => {
        this.router.navigate(['']);
      });
  }

  cancel(): void {
    this.router.navigate(['']);
  }

  deletePost(): void {
    this.playSound();
    this.postService.deletePost(this.id).subscribe((response) => {
      this.router.navigate(['/']);
    });
  }

  playSound() {
    const audio = new Audio();
    audio.src = '../../../assets/wrap.mp3';
    audio.load();
    audio.play();
  }
}
