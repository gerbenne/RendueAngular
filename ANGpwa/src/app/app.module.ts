/* 
Import and definition
*/
  // Basic interfaces to declare an Angular Module
  import { BrowserModule } from '@angular/platform-browser';
  import { NgModule } from '@angular/core';

  // Import the interface to enable HTTP request (need to be add in "imports" array)
  import { HttpClientModule } from '@angular/common/http';

  // Import the iterface to create a router (need to be add in "imports" array)
  import { RouterModule } from '@angular/router';

  // Import the application router (need to be associated to "RouterModule")
  import { MainRouter } from "./app.router";

  // Import form interfaces for complete form ability (need to be add in "imports" array)
  import { FormsModule, ReactiveFormsModule } from '@angular/forms';

  // Import the main appication component (need to be add in "declarations" array)
  import { AppComponent } from './app.component';

  // Import the route components (need to be add in "declarations" array)
  import { SigninPageComponent } from './components/signin-component/signin-page.component';
  import { MePageComponent } from './routes/me-page/me-page.component';
  import { HeaderComponent } from './shared/header/header.component';
  import { LoginPageComponent } from './components/login-component/login-page.component';
  import { TapPageComponent } from './routes/tap-page/tap-page.component';
  import { HomePageComponent } from './routes/home-page/home-page.component';

//


/* 
Config and export
*/
  // Config
  @NgModule({
    declarations: [ // All used component need to be declared in the "declarations" array
      AppComponent,
      SigninPageComponent,
      MePageComponent,
      HeaderComponent,
      LoginPageComponent,
      TapPageComponent,
      HomePageComponent
    ],
    imports: [ // All used module need to be declared in the "imports" array
      BrowserModule,
      HttpClientModule,
      RouterModule.forRoot(MainRouter), // Use "RouterModule" to define "MainRouter" has root router
      FormsModule, 
      ReactiveFormsModule
    ],
    providers: [], // Global provider can be declared in the "providers" array
    bootstrap: [ AppComponent ] // Boostrap property is used to deploy application
  })

  // Export
  export class AppModule { }
//
