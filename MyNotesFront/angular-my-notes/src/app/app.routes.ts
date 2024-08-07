import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { NoteComponent } from './components/note/note.component';

export const routes: Routes = [
    { path: 'home', component: HomeComponent },
    {path:'note',component:NoteComponent}
  ];;
