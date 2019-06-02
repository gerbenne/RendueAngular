import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  providers: [],
})

export class HomePageComponent implements OnInit {

  constructor (
    private AuthService: AuthService,
    private router:  Router,
    
    ) { }

  private token;

  ngOnInit() {
    this.token = this.AuthService.getToken();
    if(this.token===null){
      //this.router.navigateByUrl('/');
      this.router.navigate(['/'])
    }else{
      this.router.navigate(['me'])
    }
  }

}
