import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'bwm-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;
  constructor() { }

  ngOnInit() {
  }

  onLogin(){
    alert('username'+ this.username);
  }

}
