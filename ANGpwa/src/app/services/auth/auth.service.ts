  import { environment } from "../../../environments/environment";

  import { Injectable } from '@angular/core';

  import { HttpClient, HttpHeaders } from "@angular/common/http";

  import { UserModel } from "../../models/user.model";

  import * as jwt_decode from "jwt-decode";

  @Injectable({
    providedIn: 'root'
  })



  export class AuthService {

    private apiUrl = `${environment.apiUrl}/auth`;


    constructor(
      private HttpClient: HttpClient,
    ) { }


    public setToken(token: string){
      localStorage.setItem('token', token);
    }

    public getToken(){
      return localStorage.getItem('token');
    }

    public signup = ( data: UserModel ): Promise<any> => {
      let myHeader = new HttpHeaders();
      myHeader.append('Content-Type', 'application/json')


      return this.HttpClient.post( `${this.apiUrl}/register`, data, { headers: myHeader } )
      .toPromise() // Use Promise in an Angular Service
      .then( apiResponse => Promise.resolve(apiResponse) ) // Resolve Promise success
      .catch( apiResponse => Promise.reject(apiResponse) ) // Reject Promise error
    };

    public login = ( email: String, password: String ): Promise<any> => {
      let myHeader = new HttpHeaders();
      myHeader.append('Content-Type', 'application/json');
      
      return this.HttpClient.post( `${this.apiUrl}/login`, { email, password }, { headers: myHeader, withCredentials: true } )
      .toPromise() // Use Promise in an Angular Service
      .then( apiResponse => Promise.resolve(apiResponse) ) // Resolve Promise success
      .catch( apiResponse => Promise.reject(apiResponse) ) // Reject Promise error
    };

    public getDecodedAccessToken(token: string): any {
      try{
        return jwt_decode(token);
      }
      catch(Error){
        return null;
      }
    }

    public logout(){
      localStorage.clear();
    }

  }
