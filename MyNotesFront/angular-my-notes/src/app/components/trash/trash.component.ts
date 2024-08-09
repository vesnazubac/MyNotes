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
import { NotePutDTO } from '../../DTOs/NotePutDTO';
import { NoteEditDialogComponent } from '../note-edit-dialog/note-edit-dialog.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
@Component({
  selector: 'app-trash',
  standalone: true,
  imports: [MatDialogModule,MatIconModule,MatCardModule,CdkDrag,CdkDropList,CommonModule,NoteComponent,RouterOutlet, FormsModule,MatFormFieldModule, MatInputModule,MatIconModule,MatMenuModule,MatToolbarModule,MatListModule,MatSidenavModule],
  templateUrl: './trash.component.html',
  styleUrl: './trash.component.css'
})
export class TrashComponent {

  items:NoteGetDTO[]=[]
  notes: NoteGetDTO[] = [];
  searchTerm: string = '';

  constructor(private noteService: NoteService,private dialog: MatDialog) {

  }

  ngOnInit() {
    this.handleNoteSaved();
  }
  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.items, event.previousIndex, event.currentIndex);
  }
  onSearchChange(searchValue: string) {
    if (searchValue === '') {
      this.noteService.getDeletedNotes().subscribe(notes => {
        this.items = notes.reverse();
      });
    } else {
      this.noteService.searchNotes(searchValue).subscribe((notes: NoteGetDTO[]) => {
        this.items = notes.filter(note=>note.IsDeleted==true).reverse();
      });
    }
  }

  handleNoteSaved() {
    this.noteService.getDeletedNotes().subscribe(notes => {
      this.items = notes.reverse();
      console.log(notes);
    });
  }
  pinNote(note: NoteGetDTO, event: MouseEvent): void {
    const notePutDTO: NotePutDTO = {
      Title: note.Title,
      Content: note.Content,
      Color: note.Color,
      IsPinned: !note.IsPinned,
      GroupId: note.GroupId
    };
    this.noteService.updateNote(note.Id, notePutDTO).subscribe(
      updatedNote => {
        console.log('Note updated:', updatedNote);
        this.handleNoteSaved();
      },
      error => {
        console.error('Error updating note:', error);
      }
    );
  }

  restore(note: NoteGetDTO,$event: MouseEvent) {
    this.noteService.restore(note.Id).subscribe(
      updatedNote => {
        console.log('Note restored:', updatedNote);
        this.handleNoteSaved();
      },
      error => {
        console.error('Error restoring note:', error);
      }
    );
  }
}
