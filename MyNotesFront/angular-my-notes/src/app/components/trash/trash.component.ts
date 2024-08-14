import { Component } from '@angular/core';
import { NoteGetDTO } from '../../DTOs/NoteGetDTO';
import { NoteService } from '../../services/notes/notes.service';
import {CdkDragDrop, CdkDrag, CdkDropList, moveItemInArray} from '@angular/cdk/drag-drop';
import { NotePutDTO } from '../../DTOs/NotePutDTO';
import { MatDialog} from '@angular/material/dialog';
import { SharedModule } from '../../common/shared.module';
@Component({
  selector: 'app-trash',
  standalone: true,
  //imports: [MatDialogModule,MatIconModule,MatCardModule,CdkDrag,CdkDropList,CommonModule,NoteComponent,RouterOutlet, FormsModule,MatFormFieldModule, MatInputModule,MatIconModule,MatMenuModule,MatToolbarModule,MatListModule,MatSidenavModule],
  imports:[SharedModule],
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
