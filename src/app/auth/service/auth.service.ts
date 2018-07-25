import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Register} from '../models/register';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = environment.apiUrl + 'users';

  constructor(private http: HttpClient) {
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
     localStorage.setItem('bwm_auth', token)
     return token;
  }


}
