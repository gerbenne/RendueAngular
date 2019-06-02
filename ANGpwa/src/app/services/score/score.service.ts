  import { environment } from "../../../environments/environment";

  import { Injectable } from '@angular/core';

  import { HttpClient, HttpHeaders } from "@angular/common/http";

  @Injectable({
    providedIn: 'root'
  })


  export class ScoreService {

    private apiUrl = `${environment.apiUrl}/score`;


    constructor(
      private HttpClient: HttpClient
    ) { }


    public create = ( data ): Promise<any> => {
      let myHeader = new HttpHeaders();
      myHeader.append('Content-Type', 'application/json');
      myHeader.append("credentials","same-origin");

      return this.HttpClient.post( `${this.apiUrl}/`, data, { headers: myHeader, withCredentials: true} )
      .toPromise() // Use Promise in an Angular Service
      .then( apiResponse => Promise.resolve(apiResponse) )
      .catch( apiResponse => Promise.reject(apiResponse) )
    };

    public getScore = (): Promise<any> => {
      let myHeader = new HttpHeaders();
      myHeader.append('Content-Type', 'application/json');
      myHeader.append("credentials","same-origin");

      return this.HttpClient.get( `${this.apiUrl}/`, { headers: myHeader, withCredentials: true} )
      .toPromise() // Use Promise in an Angular Service
      .then( apiResponse => Promise.resolve(apiResponse) )
      .catch( apiResponse => Promise.reject(apiResponse) )
    };

  }
//
