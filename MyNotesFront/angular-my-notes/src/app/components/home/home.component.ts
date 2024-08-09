import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
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
import { ColorPickerModule } from 'ngx-color-picker';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ColorPickerModule,MatDialogModule,MatIconModule,MatCardModule,CdkDrag,CdkDropList,CommonModule,NoteComponent,RouterOutlet, FormsModule,MatFormFieldModule, MatInputModule,MatIconModule,MatMenuModule,MatToolbarModule,MatListModule,MatSidenavModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomeComponent {
  hideNavBar: boolean = false;
  itemsNotPinned:NoteGetDTO[]=[]
  itemsPinned:NoteGetDTO[]=[]
  notes: NoteGetDTO[] = [];
  searchTerm: string = '';
  colorPickerVisible: boolean = false;
  selectedColor: string = '';
  selectedNote: NoteGetDTO | null = null;

  constructor(private noteService: NoteService,private dialog: MatDialog) {

  }

  ngOnInit() {
    this.handleNoteSaved();
  }
  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.itemsNotPinned, event.previousIndex, event.currentIndex);
    moveItemInArray(this.itemsPinned, event.previousIndex, event.currentIndex);
  }
onSearchChange(searchValue: string) {
  if (searchValue === '') {
    this.noteService.getAll().subscribe(notes => {
      this.itemsPinned = notes.filter(note => !note.IsArchived && note.IsPinned).reverse();
      this.itemsNotPinned = notes.filter(note => !note.IsArchived && !note.IsPinned).reverse();
    });
  } else {
    this.noteService.searchNotes(searchValue).subscribe((filteredNotes: NoteGetDTO[]) => {
      this.itemsNotPinned = filteredNotes.filter(note => !note.IsArchived && !note.IsPinned);
      this.itemsPinned = filteredNotes.filter(note => !note.IsArchived && note.IsPinned).reverse();
    });
  }
}

  handleNoteSaved() {
    this.noteService.getAll().subscribe(notes => {
      this.itemsNotPinned = notes.filter(note => !note.IsArchived && !note.IsPinned).reverse();
      this.itemsPinned = notes.filter(note => !note.IsArchived && note.IsPinned).reverse();
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

  openEditDialog(note: NoteGetDTO,event: MouseEvent): void {
    const dialogRef = this.dialog.open(NoteEditDialogComponent, {
      width: '500px',
      data: {
        Title: note.Title,
        Content: note.Content,
        Color: note.Color,
        IsPinned: note.IsPinned,
        GroupId: note.GroupId,
        EditedDate:note.EditedDate
      }
    });

    dialogRef.afterClosed().subscribe((result: { Title: any; Content: any; Color: any; IsPinned: any; GroupId: any; }) => {
      if (result) {
        const notePutDTO: NotePutDTO = {
          Title: result.Title,
          Content: result.Content,
          Color: result.Color,
          IsPinned: result.IsPinned,
          GroupId: result.GroupId
        };
        this.noteService.updateNote(note.Id, notePutDTO).subscribe(
          updatedNote => {
            console.log('Note updated:', updatedNote);
            this.handleNoteSaved();  // Refresh notes after update
          },
          error => {
            console.error('Error updating note:', error);
          }
        );
      }
    });
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


  openColorPicker(note: NoteGetDTO,$event: MouseEvent) {
    console.log("USAO COLOR")
    this.colorPickerVisible = true;
    this.selectedNote = note;
  }

  updateCardColor(event: any) {
    const color = event.color; // Adjust this line based on the actual event structure

    if (this.selectedNote) {
      const updatedNote: NotePutDTO = {
        ...this.selectedNote,
        Color: color
      };
      this.noteService.updateNote(this.selectedNote.Id, updatedNote).subscribe(
        updatedNote => {
          console.log('Note updated:', updatedNote);
          this.handleNoteSaved(); // Refresh notes after update
        },
        error => {
          console.error('Error updating note:', error);
        }
      );
      this.colorPickerVisible = false;
      this.selectedNote = null;
    }
  }


}


