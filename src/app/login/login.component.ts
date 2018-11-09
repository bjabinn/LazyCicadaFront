import { Component, OnInit } from '@angular/core';

import { Router, ParamMap, ActivatedRoute } from '@angular/router'
import { MatDialog } from '@angular/material'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private router: Router) { }

  username: string;
  password: string;

  ngOnInit() {
  }

  login(): void {
    if (this.IsValidUser()) {
      this.router.navigate(['appHome']);
    } else {
      alert('Invalid credentials');
    }
  }

  IsValidUser(): boolean {
    let isValidUser:boolean = false;
    if (this.username != null && this.password != null) {
        isValidUser = this.username === 'admin' && this.password === 'admin';
        this.authService.login(this.username, this.password).subscribe()
    }
    return  isValidUser;
  }
}
