import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  users: any[] = [];
  posts: any[] = [];
  selectedUserId!: number;

  constructor(private userSrv: UserService) {}

  ngOnInit(): void {
    this.loadUser();
    this.getpost();
  }

  loadUser() {
    this.userSrv.getUsers().subscribe((users) => {
      this.users = users;
      this.filterUsersByRole('user');
      this.updatePostsCount();
      console.log(this.users);
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
      console.log(post);
    });
  }

  updatePostsCount() {
    this.users.forEach((user) => {
      const userPosts = this.posts.filter((post) => post.userId === user.id);
      user.postsCount = userPosts.length;
    });
  }
}
