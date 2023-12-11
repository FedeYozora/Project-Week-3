import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from 'src/app/models/post';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  post: Post | undefined;

  constructor(private postSrv: PostService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const postId = Number(params.get('id'));
      if (!isNaN(postId)) {
        this.postSrv.getPost(postId).subscribe((post) => {
          this.post = post;
        });
      }
    });
  }
}
