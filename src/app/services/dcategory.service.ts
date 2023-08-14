import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICategory } from '../models/ICategory';
import { combineLatest, map } from 'rxjs';
import { CategoryService } from './category.service';

@Injectable({
  providedIn: 'root',
})
export class DCategoryService {
  constructor(private http: HttpClient) {}

  categories$ = this.http
    .get<{ [id: string]: ICategory }>(
      `https://rxjs-posts-default-rtdb.firebaseio.com/categories.json`
    )
    .pipe(
      map((categories) => {
        let categoryData: ICategory[] = [];
        for (let id in categories) {
          categoryData.push({ ...categories[id], id });
        }

        return categoryData;
      })
    );
}
