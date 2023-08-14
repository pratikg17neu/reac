import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPost } from '../models/IPost';
import { map, mergeMap } from 'rxjs';
import { CategoryService } from './category.service';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(
    private http: HttpClient,
    private categoryService: CategoryService
  ) {}

  getPost() {
    return this.http
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
  }

  getPostWithCategory() {
    return this.getPost().pipe(
      mergeMap((posts) => {
        return this.categoryService.getCategory().pipe(
          map((categories) => {
            return posts.map((post) => {
              return {
                ...post,
                categoryName: categories.find(
                  (category) => category.id === post.categoryId
                )?.title,
              };
            });
          })
        );
      })
    );
  }
}
