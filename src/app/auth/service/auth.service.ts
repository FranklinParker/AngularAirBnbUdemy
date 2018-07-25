import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Register} from '../models/register';
import {map} from 'rxjs/operators';
import {JwtHelperService} from '@auth0/angular-jwt';
import * as moment from 'moment';


class DecodedToken {
  exp: number = 0;
  username: string = '';
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = environment.apiUrl + 'users';
  private decodedToken;
  private jwtHelper = new JwtHelperService();


  constructor(private http: HttpClient) {
    this.decodedToken = JSON.parse(localStorage.getItem('bwm_meta')) || new DecodedToken();

  }

  public isAuthenticated(): boolean {
    return moment().isBefore(this.getExpiration());
  }

  private getExpiration() {
    return moment.unix(this.decodedToken.exp);
  }

  public registerUser(register: Register) {
    return this.http.post(this.url + '/register',
      register
    );
  }

  public login(email: string, password: string) {
    return this.http.post(this.url + '/auth',
      {email, password}
    ).pipe(map((token: string) => this.saveToken(token)));
  }

  private saveToken(token: string) {
    this.decodedToken = this.jwtHelper.decodeToken(token);

    localStorage.setItem('bwm_meta', JSON.stringify(this.decodedToken));
    localStorage.setItem('bwm_auth', token);
    return token;
  }

  public logout(){
    this.decodedToken = new DecodedToken();
    localStorage.clear();
  }


}
