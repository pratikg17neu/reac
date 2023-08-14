import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { PostService } from '../../services/posts.service';
import { IPost } from 'src/app/models/IPost';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostsComponent implements OnInit, OnDestroy {
  posts: IPost[] = [];
  postSub!: Subscription;

  constructor(
    private postService: PostService,
    private ref: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.postSub = this.postService.getPostWithCategory().subscribe((data) => {
      this.posts = data;
      this.ref.detectChanges();
    });
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.postSub && this.postSub.unsubscribe();
  }
}
