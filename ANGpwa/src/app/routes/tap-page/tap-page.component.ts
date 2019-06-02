import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth/auth.service";
import {ScoreService} from "../../services/score/score.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-tap-page',
  templateUrl: './tap-page.component.html',
  providers: [ AuthService,ScoreService ]

})
export class TapPageComponent implements OnInit {
  
  public scores = [];

  constructor (    
    private AuthService: AuthService,
    private ScoreService: ScoreService,
    private router:  Router,

  ) { }

  ngOnInit() {
    let token = this.AuthService.getToken();
    if(token===null){
      this.router.navigate(['login']);
    }else{
      this.ScoreService.getScore()
        .then( apiResponse => this.provideScores(apiResponse))
        .catch( apiResponse => console.error(apiResponse) )
    }

  }

  provideScores(data){
    for (let row of data.data){
      let score = {user:"",tap:"",date:""};
      score.user = row.user.first_name;
      score.date = row.score.date;
      score.tap = row.score.tap;
      this.scores.push(score);
    }
  }

  displayDate(date){
    let da = new Date(date);
    let day = da.getDate()<10 ? "0"+da.getDate() : da.getDate();
    let month = (da.getMonth() + 1)<10 ? "0"+(da.getMonth() + 1): (da.getMonth() + 1);
    let year  = da.getFullYear();
    let hours = da.getHours()<10 ? "0"+da.getHours() : da.getHours();
    let min = da.getMinutes()<10 ? "0"+da.getMinutes() : da.getMinutes();
    let sec = da.getSeconds()<10 ? "0"+da.getSeconds() : da.getSeconds();

    return day + "-" + month + "-" + year + " " + hours + ":" + min + ":"  +sec;
  }

}
