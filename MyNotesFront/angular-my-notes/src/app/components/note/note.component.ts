import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-note',
  standalone: true,
  imports: [FormsModule,MatIcon],
  templateUrl: './note.component.html',
  styleUrl: './note.component.css',

})
export class NoteComponent {
  title: string = '';
  content: string = '';

  isPinned: boolean = false;

  saveNote() {
    // Implement logic to save the note here
    console.log('Note saved:', this.title, this.content);
  }



  togglePin() {
      this.isPinned = !this.isPinned;
  }


}
