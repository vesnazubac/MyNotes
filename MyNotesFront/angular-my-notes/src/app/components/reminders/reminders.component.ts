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
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-reminders',
  standalone: true,
  imports:  [MatDialogModule,MatIconModule,MatCardModule,CdkDrag,CdkDropList,CommonModule,NoteComponent,RouterOutlet, FormsModule,MatFormFieldModule, MatInputModule,MatIconModule,MatMenuModule,MatToolbarModule,MatListModule,MatSidenavModule],
  templateUrl: './reminders.component.html',
  styleUrl: './reminders.component.css'
})

export class RemindersComponent {

  items:NoteGetDTO[]=[]
  notes: NoteGetDTO[] = [];
  searchTerm: string = '';
  loggedInUser:any=''

  constructor(private noteService: NoteService,private dialog: MatDialog,private authService:AuthService) {

  }

  ngOnInit() {
    this.loggedInUser=this.authService.getUserIdFromToken()
    this.handleNoteSaved();
  }
  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.items, event.previousIndex, event.currentIndex);
  }
  onSearchChange(searchValue: string) {
    if (searchValue === '') {
      this.noteService.getReminderNotes(this.loggedInUser).subscribe(notes => {
        this.items = notes.reverse();
      });
    } else {
      this.noteService.searchNotes(searchValue,this.loggedInUser).subscribe((notes: NoteGetDTO[]) => {
        this.items = notes.filter(note=>note.IsDeleted==true).reverse();
      });
    }
  }

  handleNoteSaved() {
    this.noteService.getReminderNotes(this.loggedInUser).subscribe(notes => {
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
