import { Label } from './../../models/label';
import { LabelService } from './../../services/labels/label.service';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NoteService } from '../../services/notes/notes.service';
import { SharedModule } from '../../common/shared.module';
import { NotePutDTO } from '../../DTOs/NotePutDTO';

@Component({
  selector: 'app-label-dialog',
  templateUrl: './label-dialog.component.html',
  styleUrls: ['./label-dialog.component.css'],
  standalone:true,
  imports:[SharedModule]
})
export class LabelDialogComponent {
  selectedLabel: Label | null = null;
  labels: Label[] = [];

  constructor(
    public dialogRef: MatDialogRef<LabelDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { noteId:any },
    private noteService: NoteService,
    private labelService:LabelService
  ) {
    // Load existing labels for selection (you might want to fetch these from a service)
    this.loadLabels();
  }

  loadLabels(): void {
    this.labelService.getLabels().subscribe(labels => this.labels = labels);
  }
  onAddLabel(): void {
    if (this.selectedLabel) {
        console.log('Selected Label Name:', this.selectedLabel.Name);
        console.log('Selected Label ID:', this.selectedLabel.Id);
        console.log('Note ID:', this.data.noteId);
        this.noteService.getAll().subscribe(notes => {

            const noteToUpdate = notes.find(note => note.Id == this.data.noteId);

            if (noteToUpdate) {

                if (!noteToUpdate.Labels) {
                    noteToUpdate.Labels = [];
                }


                if(this.selectedLabel)
                noteToUpdate.Labels.push(this.selectedLabel.Name);


                const updatedNote: NotePutDTO = {
                    ...noteToUpdate,
                    Labels: noteToUpdate.Labels
                };
                this.noteService.updateNote( this.data.noteId,updatedNote).subscribe({
                    next: () => {
                        console.log('Note updated successfully with the new label');
                        this.dialogRef.close();
                    },
                    error: (err) => {
                        console.error('Error updating note:', err);
                    }
                });
            } else {
                console.error('Note not found');
            }
        }, error => {
            console.error('Error fetching notes:', error);

        });
    } else {
        console.warn('No label selected');
    }
}




  onCancel(): void {
    this.dialogRef.close();
  }
}
