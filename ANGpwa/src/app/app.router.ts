/* 
Imports
*/
    // Import the iterface to create a router
    import { Routes } from '@angular/router';

    // Import components used in the routes
    import { MePageComponent } from "./routes/me-page/me-page.component";
    import { TapPageComponent } from './routes/tap-page/tap-page.component';
    import { HomePageComponent } from './routes/home-page/home-page.component';

    export const MainRouter: Routes = [
        {
            path: '',
            component: HomePageComponent,
        },
        {
            path: 'me',
            component: MePageComponent
        },
        {
            path:"tap",
            component: TapPageComponent
        },
        { 
            path: '**', 
            redirectTo: '/me', 
            pathMatch: 'full' 
        },
    ];
//
