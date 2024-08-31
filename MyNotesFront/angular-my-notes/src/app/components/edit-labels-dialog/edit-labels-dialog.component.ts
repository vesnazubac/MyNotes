
import { Component } from '@angular/core';
import { SharedModule } from '../../common/shared.module';
import { Label } from '../../models/label';
import { NoteService } from '../../services/notes/notes.service';
import { MatDialogRef } from '@angular/material/dialog';
import { LabelPostDTO } from '../../DTOs/labelPostDTO';
import { LabelPutDTO } from './../../DTOs/labelPutDTO';
import { LabelService } from '../../services/labels/label.service';

@Component({
  selector: 'app-edit-labels-dialog',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './edit-labels-dialog.component.html',
  styleUrl: './edit-labels-dialog.component.css'
})
export class EditLabelsDialogComponent {
  newLabelName: string = '';
  labels: Label[] = [];
  isEditing: boolean=false;
  currentEditingId: any ;
  constructor(
    private labelService: LabelService,
    private dialogRef: MatDialogRef<EditLabelsDialogComponent>
  ) {}
  ngOnInit(): void {
    this.loadLabels();
  }

  loadLabels(): void {
    this.labelService.getLabels().subscribe(
      (labels: Label[]) => {
        this.labels = labels;
      },
      (error: any) => {
        console.error('Error fetching labels:', error);
      }
    );
  }
  createLabel(): void {
    if (this.newLabelName.trim()) {

      const newLabel: LabelPostDTO = {
        Name: this.newLabelName
      };
      this.labelService.createLabel(newLabel).subscribe(
        (label: Label) => {
          this.labels.push(label);
          this.newLabelName = '';
        },
        (error: any) => {
          console.error('Error creating label:', error);
        }
      );
    }
  }

  startEditing(label: Label): void {
    this.isEditing = true;
    this.currentEditingId = label.Id;
  }

  updateLabel(label: Label): void {
    if (label.Name.trim()) {
      const labelPutDTO: LabelPutDTO = { Name: label.Name };
      this.labelService.updateLabel(label.Id, labelPutDTO).subscribe(updatedLabel => {
        label.Name = updatedLabel.Name;
        this.isEditing = false;
        this.currentEditingId = '';
      });
    }
    this.loadLabels();
  }

  cancelEdit(): void {
    this.isEditing = false;
    this.currentEditingId = '';
  }
  deleteLabel(id: number): void {
    this.labelService.deleteLabel(id).subscribe(() => {
      this.labels = this.labels.filter(label => label.Id !== id);
    });
  }

}
