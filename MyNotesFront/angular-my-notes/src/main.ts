import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { provideRouter, RouterModule, Route, Routes } from '@angular/router';
import { AppComponent } from './app/app.component';
import { HomeComponent } from './app/components/home/home.component';
import { NoteComponent } from './app/components/note/note.component';
import { HTTP_INTERCEPTORS, provideHttpClient } from '@angular/common/http';
import { AuthInterceptor } from './app/authentication/auth.interceptor';
import { ROUTES } from '@angular/router';
import { ArchiveComponent } from './app/components/archive/archive.component';
import { TrashComponent } from './app/components/trash/trash.component';
import { LoginRegisterComponent } from './app/components/login-register/login-register.component';
import { RemindersComponent } from './app/components/reminders/reminders.component';
import { RegisterComponent } from './app/components/register/register.component';
import { LoginComponent } from './app/components/login/login.component';

import { routes } from './app/app.routes'; // Import routes
import { provideAnimations } from '@angular/platform-browser/animations';
// bootstrapApplication(AppComponent, appConfig)

// .catch((err) => console.error(err));
// const routes: Routes = [
//   { path: 'home', component: HomeComponent },
//   {path:'note',component:NoteComponent},
//   {path:'archived',component:ArchiveComponent},
//   {path:'trash',component:TrashComponent},
//   {path:'login-register',component:LoginRegisterComponent},
//   {path:'reminders', component:RemindersComponent},
//   {path:'register',component:RegisterComponent},
//   {path:"login",component:LoginComponent}
// ];

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    provideHttpClient(),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  ...appConfig.providers
})
.catch((err) => console.error(err));
