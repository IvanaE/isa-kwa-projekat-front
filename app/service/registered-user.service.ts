import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {RegisteredUser} from "../app.models";
import {BaseService} from "./base.service";

@Injectable({
  providedIn: 'root'
})
export class RegisteredUserService extends BaseService<RegisteredUser> {

  constructor(public httpClient: HttpClient) {
    super(httpClient, '/registrovani-korisnici');
  }
}
