
import { LoginRegisterComponent } from './components/login-register/login-register.component';
import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { NoteComponent } from './components/note/note.component';
import { ArchiveComponent } from './components/archive/archive.component';
import { TrashComponent } from './components/trash/trash.component';

export const routes: Routes = [
    { path: 'home', component: HomeComponent },
    {path:'note',component:NoteComponent},
    {path:'archived',component:ArchiveComponent},
    {path:'trash',component:TrashComponent},
    {path:'login-register',component:LoginRegisterComponent},

  ];
