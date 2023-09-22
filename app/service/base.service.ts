import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Inject, Injectable} from '@angular/core';

@Injectable()
export class BaseService<Entity> {

  httpEndpoint: string;

  constructor(public _httpClient: HttpClient, @Inject(String) private _httpEndPoint: string) {
    this.httpEndpoint = 'http://localhost:8080/api' + _httpEndPoint;
  }

  getAll(): Observable<Entity[]> {
    return this._httpClient.get<Entity[]>(this.httpEndpoint);
  }

  getOne(id: number): Observable<Entity> {
    return this._httpClient.get<Entity>(`${this.httpEndpoint}/${id}`);
  }

  create(item: Entity): Observable<Entity> {
    return this._httpClient.post<Entity>(this.httpEndpoint, item);
  }

  update(item: Entity): Observable<Entity> {
    return this._httpClient.put<Entity>(`${this.httpEndpoint}`, item);
  }

  delete(id: number): Observable<Entity> {
    return this._httpClient.delete<Entity>(`${this.httpEndpoint}/${id}`);
  }
}
