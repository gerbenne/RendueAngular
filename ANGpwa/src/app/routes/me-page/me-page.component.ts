import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth/auth.service";
import {ScoreService} from "../../services/score/score.service";
import {Router} from "@angular/router";
import { HeaderService } from "../../shared/header/header.service";

@Component({
  selector: 'app-me-page',
  templateUrl: './me-page.component.html',
  providers: [ AuthService,HeaderService]
})
export class MePageComponent implements OnInit {

  private token;
  private timer = 0;
  private start = false;
  private first = true;
  private count = 0;
  private interval_id;

  constructor (    
    private AuthService: AuthService,
    private router:  Router,
    private ScoreService: ScoreService,
    private HeaderService:HeaderService
  ) { }

  ngOnInit() {
    this.token = this.AuthService.getToken();
    if(this.token===null){
      this.router.navigate(['/']);
    }else{
      this.HeaderService.setToken(this.token);
    }
  }

  imgclick(){
    if (this.timer<100){
      if (this.first) {
        this.first = !this.first;
        this.interval_id = setInterval(() => {
          this.interval();
        }, 100);
      }
      this.start = !this.start;
      this.count++;
    }
  }

  clear(){
    clearInterval(this.interval_id);
  }

  interval(){
    this.start = false;
    this.timer = this.timer+1;
    if(this.timer===100){
      this.clear();
      this.ScoreService.create( {"NumeroTap":this.count})
        .then( apiResponse => this.router.navigate(['/tap']) )
        .catch( apiResponse => console.error(apiResponse) )
      }
    }
}
