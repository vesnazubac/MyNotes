import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-note',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './note.component.html',
  styleUrl: './note.component.css',
  
})
export class NoteComponent {
  title: string = '';
  content: string = '';

  saveNote() {
    // Implement logic to save the note here
    console.log('Note saved:', this.title, this.content);
  }
}
