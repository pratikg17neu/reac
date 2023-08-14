import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPost } from '../models/IPost';
import { map } from 'rxjs';

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

    
  constructor(private http: HttpClient) {}
}
