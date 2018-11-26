import { Component, OnInit } from '@angular/core';

import { Router, ParamMap, ActivatedRoute } from '@angular/router';
import { MatDialog, throwToolbarMixedModesError } from '@angular/material';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AuthenticationService } from '../Services/authentication/authentication.service';
import { User } from '../models/User/user';
import { UserService } from '../Services/user/user.service';
import { CommunicationService } from '../Services/Communication/communication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private userService: UserService,
              private comms: CommunicationService) {
                this.submitting = false;
                this.submitted = false;
              }

  public userName: string;
  public password: string;
  public loginForm: FormGroup;
  public submitting: boolean;
  public submitted: boolean;
  public errorMessage: string;
  public visible: boolean;

  ngOnInit() {
  }

  public signUp(): void {
    this.errorMessage = null;
    this. submitting = false;

    if (this.userName !== undefined && this.userName !== null && this.userName !== '' &&
        this.password !== undefined && this.password !== null && this.password !== ''  ) {
        this.getUserForLogin(this.userName, this.password);
      }
  }

  private getUserForLogin(userName: string, password: string) {
    let userFounded: User = <User> {};
    this.userService.getAll().subscribe(
      res => {
        userFounded =  res.find( (user) => (user.userName === this.userName && user.password === this.password)  );
        this.errorMessage = userFounded.userName !== '' ? null : `Wrong user name or password`;
        this.comms.setUserMessage(userFounded);
        this.router.navigate(['HomeComponent']);
        // if we need to store the user we should do it here or at the caller method.
      },
      error => {
        // do some loggin when we have a better app
        userFounded = null;
        this.errorMessage = `There was an error while logging, please retry after a few minutes.`;
        this.visible = true;
      }
    );
  }
}
