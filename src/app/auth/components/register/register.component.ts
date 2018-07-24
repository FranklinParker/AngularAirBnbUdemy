import { Component, OnInit } from '@angular/core';
import {Register} from '../../models/register';

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

  constructor() { }

  ngOnInit() {
  }

  onRegister(){
    alert(this.regFormData);
  }

}
