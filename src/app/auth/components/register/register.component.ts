import {Component, OnInit} from '@angular/core';
import {Register} from '../../models/register';
import {NgForm} from '@angular/forms';
import {AuthService} from '../../service/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'bwm-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  regFormData: Register = {
    username: undefined,
    email: undefined,
    password: undefined,
    passwordConfirmation: undefined

  };

  errors: any;

  constructor(private authService: AuthService,
              private router: Router) {
  }

  ngOnInit() {
  }

  onRegister(registerForm: NgForm) {
    this.authService.registerUser(this.regFormData)
      .subscribe(() => {
          this.router.navigate(['/login',
            {registered: 'Success' , email: this.regFormData.email,
             password: this.regFormData.password}]);
        },
        (err) => {
          this.errors = err.error.errors;
        });
  }

}
