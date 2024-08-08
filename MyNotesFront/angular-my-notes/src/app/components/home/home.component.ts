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
  selector: 'app-home',
  standalone: true,
  imports: [MatDialogModule,MatIconModule,MatCardModule,CdkDrag,CdkDropList,CommonModule,NoteComponent,RouterOutlet, FormsModule,MatFormFieldModule, MatInputModule,MatIconModule,MatMenuModule,MatToolbarModule,MatListModule,MatSidenavModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  items:NoteGetDTO[]=[]
  notes: NoteGetDTO[] = [];
  searchTerm: string = '';

  constructor(private noteService: NoteService,private dialog: MatDialog) {

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

  handleNoteSaved() {
    this.noteService.getAll().subscribe(notes => {
      this.notes = notes;
      this.items=notes;
      console.log(notes)
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
    console.log("KLIKNUT ")
    const dialogRef = this.dialog.open(NoteEditDialogComponent, {
      width: '500px',
      data: {
        Title: note.Title,
        Content: note.Content,
        Color: note.Color,
        IsPinned: note.IsPinned,
        GroupId: note.GroupId
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
}


