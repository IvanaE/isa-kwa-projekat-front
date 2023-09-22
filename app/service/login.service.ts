import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import {tap} from 'rxjs/operators';
import {AuthResponse, JWTClaims} from "../app.models";


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  token = null;
  claims: JWTClaims;
  _isLoggedIn: boolean = false;

  constructor(private httpClient: HttpClient, private cookieService: CookieService) {
    this.attemptLogin()
  }

  attemptLogin() {
    if (this.getToken()) {
      this.cookieService.set('token', this.getToken());
      this.claims = this.getClaims();
      this._isLoggedIn = true;
      return this.token;
    }
  }

  login(user) {

    return this.httpClient.post<AuthResponse>('http://localhost:8080/api/login', user).pipe(
      tap(authResponse => {

        this.token = authResponse.jwt;
        this.cookieService.set('token', authResponse.jwt);
        this.claims = this.parseClaims(this.token);

        this._isLoggedIn = true;

      })
    );

  }

  logout(): void {
    this._isLoggedIn = false;
    this.token = null;
    this.claims = null;
    this.cookieService.delete('token');
  }

  parseClaims(jwtToken: string): JWTClaims {
    return JSON.parse(atob(jwtToken.split('.')[1]));
  }

  getClaims(): JWTClaims {
    if (!(this.claims) && this.isLoggedIn()) {
      this.claims = this.parseClaims(this.getToken());
      return this.claims;
    }
    return this.claims;
  }

  validateRoles(permittedRoles: String[]): boolean {
    if (this.getClaims()) {
      for (const r of this.getClaims().authorities) {
        if (permittedRoles.includes(r)) {
          return true;
        }
      }
    }

    return false;
  }

  getToken(): string {
    if (this.token) {
      return this.token;
    } else if (!(this.token) && this.cookieService.get('token')) { // We don't have the token variable but we do have the cookie
      this.token = this.cookieService.get('token');
    }
    return this.token;
  }

  isLoggedIn(): boolean {
    return this._isLoggedIn;
  }

  getUsername(): string {
    return this.getClaims() ? this.claims.sub : '';
  }
}
