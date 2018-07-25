import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Register} from '../models/register';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = environment.apiUrl + 'users';

  constructor(private http: HttpClient) {
  }

  public  registerUser(register: Register) {
    return this.http.post(this.url + '/register',
      register
    );
  }


}
