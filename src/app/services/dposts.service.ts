import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPost } from '../models/IPost';
import { combineLatest, map } from 'rxjs';
import { DCategoryService } from './dcategory.service';

@Injectable({
  providedIn: 'root',
})
export class DPostService {
  posts$ = this.http
    .get<{ [id: string]: IPost }>(
      `https://angular-rxjs-1b020-default-rtdb.firebaseio.com/posts.json`
    )
    .pipe(
      map((posts) => {
        let postData: IPost[] = [];
        for (let id in posts) {
          postData.push({ ...posts[id], id });
        }

        return postData;
      })
    );

  constructor(
    private http: HttpClient,
    private categoryService: DCategoryService
  ) {}

  postsWithCategory$ = combineLatest([
    this.posts$,
    this.categoryService.categories$,
  ]).pipe(
    map(([posts, categories]) => {
      return posts.map((post) => {
        return {
          ...post,
          categoryName: categories.find(
            (category) => post.categoryId == category.id
          )?.title,
        } as IPost;
      });
    })
  );
}
