import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PostService } from 'src/app/services/post.service';
import { Post } from 'src/app/models/post';
import { Router } from '@angular/router';
@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss'],
})
export class NewComponent implements OnInit {
  post!: Post;

  constructor(private postSrv: PostService, private router: Router) {}

  ngOnInit(): void {}

  addPost(form: NgForm) {
    this.post = form.value;
    this.postSrv.createPost(this.post).subscribe();
    this.router.navigate(['/']);
  }
}
