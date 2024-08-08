import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotePutDTO } from '../../DTOs/NotePutDTO';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-note-edit-dialog',
  templateUrl: './note-edit-dialog.component.html',
  styleUrls: ['./note-edit-dialog.component.css'],
  imports:[FormsModule,MatInputModule,MatFormFieldModule],
  standalone:true
})
export class NoteEditDialogComponent {

  noteData: NotePutDTO;

  constructor(
    public dialogRef: MatDialogRef<NoteEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: NotePutDTO
  ) {
    // Initialize form data with passed data
    this.noteData = { ...data };
  }

  onSave(): void {
    this.dialogRef.close(this.noteData);
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
