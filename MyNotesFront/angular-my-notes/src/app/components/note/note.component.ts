import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarConfig, MatSnackBarModule } from '@angular/material/snack-bar';
import { NoteService } from '../../services/notes/notes.service';
import { NotePostDTO } from '../../DTOs/NotePostDTO';
import { AuthService } from '../../services/auth/auth.service';


@Component({
  selector: 'app-note',
  standalone: true,
  imports: [FormsModule, MatIconModule, MatSnackBarModule],
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css'],
})
export class NoteComponent  {
  title: string = '';
  content: string = '';
  isPinned: boolean = false;
  @Output() noteSaved = new EventEmitter<void>();
  noteForm: FormGroup;
  loggedInUser:any=''


  constructor(private noteService: NoteService, public snackBar: MatSnackBar,private authService:AuthService) {
    this.noteForm = new FormGroup({
      title: new FormControl(''),
      content: new FormControl(''),
      color: new FormControl('#FFFFFF'),
      isPinned: new FormControl(false),
      userId: new FormControl(''),
      groupId: new FormControl('00000000-0000-0000-0000-000000000001')
    });
  }
  ngOnInit() {
    this.loggedInUser=this.authService.getUserIdFromToken();
  }
  saveNote() {
    const newNote: NotePostDTO = {
      title: this.title,
      content: this.content,
      color: '#FFFFFF',
      isPinned: this.isPinned,
      userId: this.loggedInUser,
      groupId: '00000000-0000-0000-0000-000000000001',
      images:[]
    };

    this.noteService.create(newNote).subscribe(
      (response) => {
        this.showSnackBar("Note is successfully created!")
        console.log('Note saved:', response);
        this.noteSaved.emit();
        this.content='';
        this.title='';
        this.isPinned=false;
      },
      (error) => {
       this.showSnackBar("Error saving note")
        console.log('GRESKA');
        console.error('Error saving note:', error);
      }
    );
  }
  togglePin() {
    this.isPinned = !this.isPinned;
  }
  showSnackBar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
      panelClass: ['custom-snackbar'],
    });
  }
}

