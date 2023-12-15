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
  userId!: number;

  post: Post = {
    userId: 0,
    title: '',
    body: '',
  };

  constructor(private postSrv: PostService, private router: Router) {}

  ngOnInit(): void {
    let user = localStorage.getItem('user');
    if (user) {
      let userID = JSON.parse(user).user.id;
      this.userId = userID;
    }
  }

  addPost() {
    this.playSound();
    this.post.userId = this.userId;
    this.postSrv.createPost(this.post).subscribe();
    this.router.navigate(['/']);
  }

  playSound() {
    const audio = new Audio();
    audio.src = '../../../assets/write.mp3';
    audio.load();
    audio.play();
  }

  backToHome() {
    this.router.navigate(['/']);
  }
}
