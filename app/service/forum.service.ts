import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {BaseService} from "./base.service";
import {Forum} from "../app.models";


@Injectable({
  providedIn: 'root'
})
export class ForumService extends BaseService<Forum> {

  constructor(public httpClient: HttpClient) {
    super(httpClient, '/forumi');
  }
}
