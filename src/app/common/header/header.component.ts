import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../auth/service/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  searchCity: string ='boston';
  constructor(public auth: AuthService,
              private router: Router) { }

  ngOnInit() {
  }

  logout(){
    this.auth.logout();
    this.router.navigate(['/login'])
  }
}
