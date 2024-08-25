import { NotePutDTO } from './../../DTOs/NotePutDTO';
import { AuthService } from '../../services/auth/auth.service';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NoteGetDTO } from '../../DTOs/NoteGetDTO';
import { NoteService } from '../../services/notes/notes.service';
import {CdkDragDrop, CdkDrag, CdkDropList, moveItemInArray} from '@angular/cdk/drag-drop';
import { NoteEditDialogComponent } from '../note-edit-dialog/note-edit-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Note } from '../../models/Note';
import { DateTimePickerDialogComponent } from '../datetime-picker-dialog/datetime-picker-dialog.component';
import { SignalRService } from '../../services/SignalR/signalR.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SharedModule } from '../../common/shared.module';
import { NoteComponent } from '../note/note.component';
import { ColorOption } from '../../models/color';
import { ColorPickerDialogComponent } from '../color-picker-dialog/color-picker-dialog.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NoteComponent,SharedModule],
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
  selectedNote: NoteGetDTO | null = null;
  showDateTimePicker=false;
  loggedInUser:any;
  carouselOptions = {
    loop: true,
    nav: true,
    dots: false,
    items: 1,
    autoHeight: true,
  };



  constructor( private authService:AuthService,private snackBar: MatSnackBar,private noteService: NoteService,private dialog: MatDialog,private signalRService: SignalRService) {

  }

  ngOnInit() {
    this.loggedInUser=this.authService.getUserIdFromToken();
    this.handleNoteSaved();
    this.signalRService.hubConnection.on('ReceiveReminder', (message: string) => {
      this.snackBar.open(message, 'Close', {
        duration: 8000,
        horizontalPosition: 'right',
        verticalPosition: 'bottom',
      });
    });
  }
  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.itemsNotPinned, event.previousIndex, event.currentIndex);
    moveItemInArray(this.itemsPinned, event.previousIndex, event.currentIndex);
  }
  onSearchChange(searchValue: string) {
    if (searchValue === '') {
      this.noteService.getById(this.loggedInUser).subscribe(notes => {
        this.itemsPinned = notes.filter(note => !note.IsArchived && note.IsPinned).reverse();
        this.itemsNotPinned = notes.filter(note => !note.IsArchived && !note.IsPinned).reverse();
      });
    } else {
      this.noteService.searchNotes(searchValue,this.loggedInUser).subscribe((filteredNotes: NoteGetDTO[]) => {
        this.itemsNotPinned = filteredNotes.filter(note => !note.IsArchived && !note.IsPinned).reverse();
        this.itemsPinned = filteredNotes.filter(note => !note.IsArchived && note.IsPinned).reverse();
      });
    }
  }
  handleNoteSaved() {
    this.noteService.getById(this.loggedInUser).subscribe(notes => {
      this.itemsNotPinned = notes.filter(note => !note.IsPinned).reverse();
      this.itemsPinned = notes.filter(note => note.IsPinned).reverse();
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
      Images:note.Images
    };
    this.noteService.updateNote(note.Id, notePutDTO).subscribe(
      updatedNote => {
        console.log('Note updated:', updatedNote);
        this.showSnackBar("Your note is now pinned!")
        this.handleNoteSaved();
      },
      error => {
        console.error('Error pinning note:', error);
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
        EditedDate:note.EditedDate,
        Images:note.Images
      }
    });

    dialogRef.afterClosed().subscribe((result: { Title: any; Content: any; Color: any; IsPinned: any; GroupId: any; ReminderDate:any,Images:any }) => {
      if (result) {
        const notePutDTO: NotePutDTO = {
          Title: result.Title,
          Content: result.Content,
          Color: result.Color,
          IsPinned: result.IsPinned,
          GroupId: result.GroupId,
          ReminderDate:result.ReminderDate,
          Images:result.Images
        };
        this.noteService.updateNote(note.Id, notePutDTO).subscribe(
          updatedNote => {
            console.log('Note updated:', updatedNote);
            this.handleNoteSaved();
            this.showSnackBar("Your note is now updated!")
          },
          error => {
            console.error('Error updating note:', error);
            this.showSnackBar("Error updating note")
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
        this.showSnackBar("Your note is now archived. You can find it  in archive section")
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
        this.showSnackBar("Your note is now temporarily deleted. You can find it  in trash section")
        this.handleNoteSaved();
      },
      error: (error) => {
        console.error('Error setting deleted date:', error);
        this.showSnackBar("Error deleting note")
      }
    });
  }


  openColorPicker(note: NoteGetDTO,$event: MouseEvent) {
    console.log("USAO COLOR")
    this.selectedNote = note;
  }

  updateCardColor(event: any) {
    const color = event.color;
    if (this.selectedNote) {
      const updatedNote: NotePutDTO = {
        ...this.selectedNote,
        Color: color
      };
      this.noteService.updateNote(this.selectedNote.Id, updatedNote).subscribe(
        updatedNote => {
          console.log('Note updated:', updatedNote);
          this.handleNoteSaved();
        },
        error => {
          console.error('Error updating note:', error);
        }
      );
      this.selectedNote = null;
    }
  }

  toggleDateTimePicker(item: NoteGetDTO, event: Event): void {
    const dialogRef = this.dialog.open(DateTimePickerDialogComponent, {
      width: '450px',
      data: {
        selectedDate: item.ReminderDate|| new Date()
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Update the note with the selected date and time
        item.ReminderDate= result;

        // You can now save the note with the updated notification date
        const notePutDTO: NotePutDTO = {
          Title: item.Title,
          Content: item.Content,
          Color: item.Color,
          IsPinned: item.IsPinned,
          GroupId: item.GroupId,
          ReminderDate: item.ReminderDate,
          Images:item.Images
        };
        this.noteService.updateNote(item.Id, notePutDTO).subscribe(
          updatedNote => {
            console.log('Notification date updated:', updatedNote);
            this.handleNoteSaved();
            this.showSnackBar("Your reminder has been set. You’ll receive notifications to keep you on track.")
          },
          error => {
            console.error('Error updating notification date:', error);
            this.showSnackBar('Error setting reminder')
          }
        );
      }
    });
  }
  onDateSelected(event: any, item: any): void {
    const selectedDate = event.value;
    item.notificationDate = selectedDate;
    item.showDateTimePicker = false;
  }
  openColorPickerDialog(item: NoteGetDTO, event: Event){
    const dialogRef = this.dialog.open(ColorPickerDialogComponent);
    dialogRef.afterClosed().subscribe((selectedColor: string) => {
      if (selectedColor) {
        item.Color = selectedColor;
        const notePutDTO: NotePutDTO = {
          Title: item.Title,
          Content: item.Content,
          Color: selectedColor,
          IsPinned: item.IsPinned,
          GroupId: item.GroupId,
          ReminderDate:item.ReminderDate,
          Images:item.Images
        };
        this.noteService.updateNote(item.Id, notePutDTO).subscribe(
          updatedNote => {
            console.log('Note updated:', updatedNote);
            this.handleNoteSaved();
          },
          error => {
            console.error('Error updating note:', error);
          }
        );
      }
    });
  }

  openFileDialog(item: any, event: Event) {
    event.stopPropagation();
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.onchange = (e: any) => {
      this.onFileSelected(e, item);
    };
    fileInput.click();
  }
  onFileSelected(event: any, item: any) {
  const file: File = event.target.files[0];
  const reader = new FileReader();

  reader.onload = () => {
    if (!item.Images) {
      item.Images = [];
    }
    item.Images.push(reader.result as string);
    this.saveNoteWithImage(item);
  };

  reader.readAsDataURL(file);
  }
  saveNoteWithImage(item: NoteGetDTO) {
    this.noteService.updateNote(item.Id,item).subscribe(response => {
      console.log('Note updated with image:', response);
      this.handleNoteSaved();
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



