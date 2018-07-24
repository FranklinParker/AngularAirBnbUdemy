import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'bwm-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  email: string;
  password: string;
  username: string;
  passwordConfirmation: string;
  constructor() { }

  ngOnInit() {
  }

  onRegister(){
    alert(this.email);
  }

}
