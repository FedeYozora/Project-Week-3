import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { CommentService } from 'src/app/services/comment.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  users: any[] = [];
  posts: any[] = [];
  comments: any[] = [];
  selectedUserId!: number;

  postsCount = 0;
  commsCount = 0;

  constructor(private userSrv: UserService, private commSrv: CommentService) {}

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

  selectUser(userId: number) {
    this.selectedUserId = userId;
  }

  deleteUser(userId: number): void {
    this.userSrv.delUser(userId).subscribe(() => {
      this.loadUser();
    });
  }

  getpost() {
    this.userSrv.getPosts().subscribe((post) => {
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
