import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NoteComponent } from './note/note.component';

export const routes: Routes = [
    { path: 'home', component: HomeComponent },
    {path:'note',component:NoteComponent}
  ];;
