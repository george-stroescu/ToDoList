import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Item } from './item';


@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private listUrl = 'api/items';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  getList(): Observable<Item[]> {
    return this.http.get<Item[]>(this.listUrl);
  }

  addToList(item: Item): Observable<Item>
  {
    return this.http.post<Item>(this.listUrl, item, this.httpOptions);
  }

  updateItem(item: Item): Observable<any>
  {
    return this.http.put(this.listUrl, item, this.httpOptions);
  }

  deleteItem (item: Item | number): Observable<Item> {
    const id = typeof item === 'number' ? item : item.id;
    const url = `${this.listUrl}/${id}`;

    return this.http.delete<Item>(url, this.httpOptions);
  }
}
