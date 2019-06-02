import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth/auth.service";
import {Router} from "@angular/router";
import { Location } from "@angular/common";
import { HeaderService } from "./header.service";
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [],
  providers: [HeaderService]
})
export class HeaderComponent implements OnInit {

  private token;
  private first_name;
  private where;

  constructor (
    private AuthService: AuthService,
    private router:  Router,
    private location: Location,
    private HeaderService:HeaderService,
  ) {}

  public setToken(token){
    this.token = token;
    let jwt = this.AuthService.getDecodedAccessToken(this.token);
    this.first_name = jwt.first_name.toUpperCase();
  }

  ngOnInit() {

    this.HeaderService.change.subscribe(token => {
      this.setToken(token);
    });

    this.token = this.AuthService.getToken();
    if (this.token!==null){
      let jwt = this.AuthService.getDecodedAccessToken(this.token);
      this.first_name = jwt.first_name.toUpperCase();
    }
    if (location.pathname!=="/me" && location.pathname!=="/tap"){
      this.where = "/me";
    }
    else{
      this.where = location.pathname;
    }
  }

  logout(){
    this.AuthService.logout();
    this.token=null;
    this.router.navigate(["/"])
  }

  score(){
    this.where = "/tap";
    this.router.navigate(["/tap"])
  }

  play(){
    this.where = "/me";
    this.router.navigate(["/me"])
  }

}
