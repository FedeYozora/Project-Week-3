import { Component, OnInit, HostListener } from '@angular/core';
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
  idleTimer!: any;
  counter: number = 0;

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.getPosts();
    this.startTimer();
  }

  @HostListener('document:mousemove')
  @HostListener('document:keypress')
  resetTimer(): void {
    clearTimeout(this.idleTimer);
    this.startTimer();
    this.counter = 0;
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

  startTimer(): void {
    this.idleTimer = setTimeout(() => {
      this.counter++;
      if (this.counter >= 20) {
        const audio = new Audio('../../../assets/Boring Elevator Music.mp3');
        audio.play();
        this.counter = 0;
      }
      this.startTimer();
    }, 1000);
  }

  ngOnDestroy(): void {
    clearTimeout(this.idleTimer);
  }
}
