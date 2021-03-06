import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import {AuthService} from '../../service/auth.service';

@Component({
  selector: 'bwm-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  errors: any[] = [];
  notifyMessage: string = '';

  constructor(private fb: FormBuilder,
              private auth: AuthService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.initForm();

    this.route.params.subscribe((params) => {
      console.log('params', params);
      if (params['registered'] === 'Success') {
        this.notifyMessage = 'You have been succesfuly registered, you can login now!';
      }
      if(params['email'] && params['password']){
        this.loginForm.get('email').patchValue(params['email']);
        this.loginForm.get('password').patchValue(params['password']);
      }else{
        this.loginForm.get('email').patchValue('');
        this.loginForm.get('password').patchValue('');
      }



    })
  }

  initForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required,
        Validators.pattern('^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$')]],
      password: ['', Validators.required]
    })
  }

  isInvalidForm(fieldName): boolean {
    return this.loginForm.controls[fieldName].invalid &&
      (this.loginForm.controls[fieldName].dirty || this.loginForm.controls[fieldName].touched)
  }


  isRequired(fieldName): boolean {
    return this.loginForm.controls[fieldName].errors.required
  }

  login() {
    const { email, password} = this.loginForm.value;
    this.auth.login(email,password)
      .subscribe((token:string)=>{

        this.router.navigate(
          ['/rentals',{message: 'Logged in'}]);
      },
        err=>{
            this.errors = err.error.errors;
        })
  }
}
