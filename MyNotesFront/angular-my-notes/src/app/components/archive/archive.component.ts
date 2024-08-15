import { Component } from '@angular/core';
import { NoteGetDTO } from '../../DTOs/NoteGetDTO';
import { NoteService } from '../../services/notes/notes.service';
import {CdkDragDrop, CdkDrag, CdkDropList, moveItemInArray} from '@angular/cdk/drag-drop';
import { NotePutDTO } from '../../DTOs/NotePutDTO';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Note } from '../../models/Note';


import { SharedModule } from '../../common/shared.module';
import { AuthService } from '../../services/auth/auth.service';
@Component({
  selector: 'app-archive',
  standalone: true,
  imports:[SharedModule],
  templateUrl: './archive.component.html',
  styleUrl: './archive.component.css'
})
export class ArchiveComponent {

  items:NoteGetDTO[]=[]
  notes: NoteGetDTO[] = [];
  searchTerm: string = '';
  loggedInUser:any=''

  constructor(private noteService: NoteService,private dialog: MatDialog,private authService:AuthService) {

  }

  ngOnInit() {
    this.loggedInUser=this.authService.getUserIdFromToken();
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
    this.noteService.getArchivedById(this.loggedInUser).subscribe(notes => {
      const archivedNotes = notes;

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
