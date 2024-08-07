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
import { NoteGetDTO } from '../../DTOs/NoteGetDTO';
import { NoteService } from '../../services/notes/notes.service';
import { CommonModule } from '@angular/common';
import {CdkDragDrop, CdkDrag, CdkDropList, moveItemInArray} from '@angular/cdk/drag-drop';
import { MatCardModule } from '@angular/material/card';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatCardModule,CdkDrag,CdkDropList,CommonModule,NoteComponent,RouterOutlet, FormsModule,MatFormFieldModule, MatInputModule,MatIconModule,MatMenuModule,MatToolbarModule,MatListModule,MatSidenavModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  items:NoteGetDTO[]=[]
  notes: NoteGetDTO[] = [];
  searchTerm: string = '';

  constructor(private noteService: NoteService) {

  }

  ngOnInit() {
    this.noteService.getAll().subscribe(notes => {
      this.notes = notes;
      this.items=notes;
      console.log(notes)
    });

  }
  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.items, event.previousIndex, event.currentIndex);
  }

  onSearchChange(searchValue: string) {
    // Implement your search functionality here
    console.log('Search value:', searchValue);
  }


}

