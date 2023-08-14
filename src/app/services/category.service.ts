import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICategory } from '../models/ICategory';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private http: HttpClient) {}

  getCategory() {
    return this.http
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





}
