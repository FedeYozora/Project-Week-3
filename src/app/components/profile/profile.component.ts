import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';
import { Post } from 'src/app/models/post';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  currentUser: any;
  followerNum!: number;
  posts!: Post[];

  constructor(private userSrv: UserService, private postSrv: PostService) {
    this.generateRandom();
  }

  ngOnInit(): void {
    this.currentUser = this.userSrv.getUserFromLocalStorage();
    this.postSrv
      .getPostsByUserId(this.currentUser.user.id)
      .subscribe((posts) => {
        this.posts = posts;
      });
  }

  generateRandom() {
    this.followerNum = Math.floor(Math.random() * 1000) + 1;
  }
}
