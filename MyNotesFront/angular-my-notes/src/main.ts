import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { provideRouter, RouterModule, Route } from '@angular/router';
import { AppComponent } from './app/app.component';
import { HomeComponent } from './app/home/home.component';
import { NoteComponent } from './app/note/note.component';

const routes: Route[] = [
  { path: 'home', component: HomeComponent },
  {path:'note',component:NoteComponent}
];
bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));


