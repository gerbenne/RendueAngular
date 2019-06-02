/* 
Imports and config
*/

  // Import the "OnInit" interface to enable Angular "ngOnInit" hook (cf. code below)
  import { Component, OnInit } from '@angular/core';

  // Import interface to use Angular form technic
  import { FormBuilder, FormGroup, Validators } from "@angular/forms";

  // Import the service you need to use
  import { AuthService } from "../../services/auth/auth.service";

  import { Router } from  "@angular/router";

// Config
  @Component({
    selector: 'app-login-component',
    templateUrl: './login-page.component.html',
    providers: [ AuthService ]
  }) 
//
export class LoginPageComponent implements OnInit {

  public form: FormGroup;
  public isCollapsed = false;

  constructor(
    private AuthService: AuthService,
    private FormBuilder: FormBuilder,
    private router:  Router,

  ) { }

  private initForm = () => {
    this.form = this.FormBuilder.group({
      email: [ undefined, Validators.required ],
      password: [ undefined, Validators.required ]
    })
  };

  public login = () => {
    this.AuthService.login( this.form.value.email, this.form.value.password )
    .then( apiResponse => this.handleSuccess(apiResponse) )
    .catch( apiResponse => console.error(apiResponse) )
  };

  handleSuccess(data){
    this.AuthService.setToken(data.data);
    this.router.navigate(['me']);
  }
  ngOnInit() {
    this.initForm()
  }

}
