import { Component } from '@angular/core';
import { NoteComponent } from '../note/note.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatMenuItem, MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterOutlet } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NoteComponent,RouterOutlet, FormsModule,MatFormFieldModule, MatInputModule,MatIconModule,MatMenuModule,MatToolbarModule,MatListModule,MatSidenavModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

onSearchChange() {
throw new Error('Method not implemented.');
}
  searchTerm: string = '';

}

