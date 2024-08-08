import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarConfig, MatSnackBarModule } from '@angular/material/snack-bar';
import { NoteService } from '../../services/notes/notes.service';
import { NotePostDTO } from '../../DTOs/NotePostDTO';


@Component({
  selector: 'app-note',
  standalone: true,
  imports: [FormsModule, MatIconModule, MatSnackBarModule],
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css'],
})
export class NoteComponent {
  title: string = '';
  content: string = '';
  isPinned: boolean = false;

  constructor(private noteService: NoteService, public snackBar: MatSnackBar) {}

  saveNote() {
    const newNote: NotePostDTO = {
      title: this.title,
      content: this.content,
      color: '#FFFFFF',
      createdDate: new Date(),
      editedDate: new Date(),
      isPinned: this.isPinned,
      isArchived: false,
      userId: 1,
      groupId: 1,
    };

    this.noteService.create(newNote).subscribe(
      (response) => {

        this.snackBar.open('Note successfully created', 'Close', {
          duration: 3000,
        });
        console.log('Note saved:', response);
      },
      (error) => {
        this.snackBar.open('Error saving note', 'Close', {
          duration: 3000,
        });
        console.log('GRESKA');
        console.error('Error saving note:', error);
      }
    );
  }

  togglePin() {
    this.isPinned = !this.isPinned;
  }
}

