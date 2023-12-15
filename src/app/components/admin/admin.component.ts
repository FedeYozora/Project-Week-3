import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { CommentService } from 'src/app/services/comment.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  users: any[] = [];
  posts: any[] = [];
  comments: any[] = [];

  postsCount = 0;
  commsCount = 0;

  constructor(
    private userSrv: UserService,
    private commSrv: CommentService,
    private postSrv: PostService
  ) {}

  ngOnInit(): void {
    this.loadUser();
  }

  loadUser() {
    this.userSrv.getUsers().subscribe((users) => {
      this.users = users;
      this.filterUsersByRole('user');
      this.getComments();
      this.getpost();
    });
  }

  filterUsersByRole(role: string): void {
    this.users = this.users.filter((user) => user.role === role);
  }

  banUser(userId: number) {
    let bannedUser = this.users.find((user) => user.id === userId);

    let bannedUserMail = bannedUser.email;

    this.userSrv.addBannedUser({ email: bannedUserMail }).subscribe();
  }

  deleteUser(userId: number): void {
    this.banUser(userId);
    this.userSrv.delUser(userId).subscribe(() => {
      this.commSrv.banComments(userId).subscribe((comments) => {
        if (!comments) {
          return;
        }
      });

      this.postSrv.banPosts(userId).subscribe((posts) => {
        if (!posts) {
          this.loadUser();
          return;
        } else {
          this.loadUser();
        }
      });
    });
  }

  getpost() {
    this.postSrv.getPosts().subscribe((post) => {
      this.posts = post;
      this.updatePostsCount();
    });
  }

  getComments() {
    this.commSrv.getAllComments().subscribe((comments) => {
      this.comments = comments;
      this.updateCommsCount();
    });
  }

  updatePostsCount() {
    this.users.forEach((user) => {
      const userPosts = this.posts.filter((post) => post.userId === user.id);
      user.postsCount = userPosts.length;
    });
  }

  updateCommsCount() {
    this.users.forEach((user) => {
      const userComms = this.comments.filter(
        (comment) => comment.userId === user.id
      );
      user.commsCount = userComms.length;
    });
  }
}
