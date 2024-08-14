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
import { Note } from '../../models/Note';


import { SharedModule } from '../../common/shared.module';
@Component({
  selector: 'app-archive',
  standalone: true,
  //imports: [MatDialogModule,MatIconModule,MatCardModule,CdkDrag,CdkDropList,CommonModule,NoteComponent,RouterOutlet, FormsModule,MatFormFieldModule, MatInputModule,MatIconModule,MatMenuModule,MatToolbarModule,MatListModule,MatSidenavModule],
  imports:[SharedModule],
  templateUrl: './archive.component.html',
  styleUrl: './archive.component.css'
})
export class ArchiveComponent {

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
      this.noteService.getAll().subscribe(notes => {
        this.items = notes.filter(note => note.IsArchived).reverse();
      });
    } else {
      this.noteService.searchNotes(searchValue).subscribe((filteredNotes: NoteGetDTO[]) => {
        this.items = filteredNotes.filter(note => note.IsArchived);
      });
    }
  }

  handleNoteSaved() {
    this.noteService.getAll().subscribe(notes => {
      const archivedNotes = notes.filter(note => note.IsArchived);

      // Create a map to store unique notes by their Id
      const uniqueNotesMap = new Map<string, any>();

      // Iterate through the notes and add them to the map
      archivedNotes.forEach(note => {
        if (!uniqueNotesMap.has(note.Id)) {
          uniqueNotesMap.set(note.Id, note);
        }
      });

      // Convert the map values to an array
      const uniqueArchivedNotes = Array.from(uniqueNotesMap.values());

      // Reverse the array and assign to the class properties
      this.notes = uniqueArchivedNotes;
      this.items = uniqueArchivedNotes.reverse();

      console.log(uniqueArchivedNotes);
    });
  }
  pinNote(note: NoteGetDTO, event: MouseEvent): void {
    const notePutDTO: NotePutDTO = {
      Title: note.Title,
      Content: note.Content,
      Color: note.Color,
      IsPinned: !note.IsPinned,
      GroupId: note.GroupId,
      ReminderDate:note.ReminderDate
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

  archiveNote(note: NoteGetDTO,$event: MouseEvent) {
    this.noteService.archiveNote(note.Id).subscribe(
      updatedNote => {
        console.log('Note archived:', updatedNote);
        this.handleNoteSaved();
      },
      error => {
        console.error('Error archiving note:', error);
      }
    );
  }
  deleteNote(note: NoteGetDTO,$event: MouseEvent) {
    this.noteService.setDeletedDate(note.Id).subscribe({
      next: (updatedNote: Note) => {
        console.log('Note deleted date set:', updatedNote);
        this.handleNoteSaved();
      },
      error: (error) => {
        console.error('Error setting deleted date:', error);
      }
    });
  }
}
