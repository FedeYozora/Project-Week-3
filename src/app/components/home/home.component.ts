import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import { Post } from 'src/app/models/post';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  posts!: Post[];
  searchInput!: string;

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.getPosts();
  }

  getPosts(): void {
    this.postService.getPosts().subscribe(
      (posts) => {
        this.posts = posts;
      },
      (error) => {
        console.log('Error getting posts:', error);
      }
    );
  }

  searchPosts(searchValue: string): void {
    this.searchInput = searchValue;
    if (!this.searchInput) {
      this.getPosts();
      return;
    }

    this.posts = this.posts.filter((post) =>
      post.title.toLowerCase().includes(this.searchInput.toLowerCase())
    );
  }
}
