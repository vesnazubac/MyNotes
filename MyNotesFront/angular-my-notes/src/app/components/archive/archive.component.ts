import { Component } from '@angular/core';
import { NoteGetDTO } from '../../DTOs/NoteGetDTO';
import { NoteService } from '../../services/notes/notes.service';
import {CdkDragDrop, CdkDrag, CdkDropList, moveItemInArray} from '@angular/cdk/drag-drop';
import { NotePutDTO } from '../../DTOs/NotePutDTO';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Note } from '../../models/Note';


import { SharedModule } from '../../common/shared.module';
import { AuthService } from '../../services/auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
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

  constructor(private snackBar:MatSnackBar,private noteService: NoteService,private dialog: MatDialog,private authService:AuthService) {

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
      this.noteService.getArchivedById(this.loggedInUser).subscribe(notes => {
        this.items = notes.reverse();
      });
    } else {
      this.noteService.searchNotes(searchValue,this.loggedInUser).subscribe((filteredNotes: NoteGetDTO[]) => {
        this.items = filteredNotes.filter(note => note.IsArchived);
      });
    }
  }

  handleNoteSaved() {
    this.noteService.getArchivedById(this.loggedInUser).subscribe(notes => {
      const archivedNotes = notes;
      const uniqueNotesMap = new Map<string, any>();
      archivedNotes.forEach(note => {
        if (!uniqueNotesMap.has(note.Id)) {
          uniqueNotesMap.set(note.Id, note);
        }
      });
      const uniqueArchivedNotes = Array.from(uniqueNotesMap.values());
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
      ReminderDate:note.ReminderDate,
      Images:note.Images,
      Labels:note.Labels
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
        this.showSnackBar("Note has been archived. You can find it in archive section")
      },
      error => {
        console.error('Error archiving note:', error);
        this.showSnackBar("Error creating note")
      }
    );
  }
  deleteNote(note: NoteGetDTO,$event: MouseEvent) {
    this.noteService.setDeletedDate(note.Id).subscribe({
      next: (updatedNote: Note) => {
        console.log('Note deleted date set:', updatedNote);
        this.handleNoteSaved();
        this.showSnackBar("Note has been temporarily deleted.You can find it in trash section")
      },
      error: (error) => {
        console.error('Error setting deleted date:', error);
        this.showSnackBar("Error deleting note")
      }
    });
  }
  showSnackBar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
      panelClass: ['custom-snackbar'],
    });
  }

  currentIndexMap = new Map<string, number>();

  getCurrentIndex(itemId: string): number {
    return this.currentIndexMap.get(itemId) || 0;
  }

  prevSlide(item: any, event: Event) {
    event.stopPropagation();
    const currentIndex = this.getCurrentIndex(item.Id);
    const newIndex = (currentIndex > 0) ? currentIndex - 1 : item.Images.length - 1;
    this.currentIndexMap.set(item.Id, newIndex);
    this.updateCarousel(item.Id);
  }

  nextSlide(item: any, event: Event) {
    event.stopPropagation();
    const currentIndex = this.getCurrentIndex(item.Id);
    const newIndex = (currentIndex < item.Images.length - 1) ? currentIndex + 1 : 0;
    this.currentIndexMap.set(item.Id, newIndex);
    this.updateCarousel(item.Id);
  }

  updateCarousel(itemId: string) {
    const wrapper = document.querySelector(`.carousel-wrapper[data-item-id="${itemId}"]`) as HTMLElement;
    if (wrapper) {
      const currentIndex = this.getCurrentIndex(itemId);
      wrapper.style.transform = `translateX(-${currentIndex * 100}%)`;
    }
  }
}
