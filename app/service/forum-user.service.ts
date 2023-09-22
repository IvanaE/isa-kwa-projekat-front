import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {BaseService} from "./base.service";
import {KorisnikNaForumu} from "../app.models";

@Injectable({
  providedIn: 'root'
})
export class ForumUserService extends BaseService<KorisnikNaForumu> {

  constructor(public httpClient: HttpClient) {
    super(httpClient, '/korisnici-na-forumu');
  }
}
