
import { LoginRegisterComponent } from './components/login-register/login-register.component';
import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { NoteComponent } from './components/note/note.component';
import { ArchiveComponent } from './components/archive/archive.component';
import { TrashComponent } from './components/trash/trash.component';
import { RemindersComponent } from './components/reminders/reminders.component';
import { RegisterComponent } from './components/register/register.component';

export const routes: Routes = [
    { path: 'home', component: HomeComponent },
    {path:'note',component:NoteComponent},
    {path:'archived',component:ArchiveComponent},
    {path:'trash',component:TrashComponent},
    {path:'login-register',component:LoginRegisterComponent},
    {path:'reminders', component:RemindersComponent},
    {path:'register',component:RegisterComponent}
  ];
