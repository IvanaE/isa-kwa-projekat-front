import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BaseService} from "./base.service";
import {Tema} from "../app.models";

@Injectable({
  providedIn: 'root'
})
export class TopicService extends BaseService<Tema> {

  constructor(public httpClient: HttpClient) {
    super(httpClient, '/teme');
  }
}
