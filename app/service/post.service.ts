import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BaseService} from "./base.service";
import {Objava} from "../app.models";

@Injectable({
  providedIn: 'root'
})
export class PostService extends BaseService<Objava> {

  constructor(public httpClient: HttpClient) {
    super(httpClient, '/objave');
  }
}
