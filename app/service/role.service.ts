import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Uloga} from "../app.models";
import {BaseService} from "./base.service";

@Injectable({
  providedIn: 'root'
})
export class RoleService extends BaseService<Uloga> {

  constructor(public httpClient: HttpClient) {
    super(httpClient, '/uloge');
  }
}
