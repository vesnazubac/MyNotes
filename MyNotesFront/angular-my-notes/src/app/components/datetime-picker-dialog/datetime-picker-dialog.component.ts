import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-date-time-picker-dialog',
  templateUrl: './datetime-picker-dialog.component.html',
  styleUrls: ['./datetime-picker-dialog.component.css'],
  standalone: true,
  imports: [CommonModule,MatSelectModule,MatOptionModule,MatDialogModule,MatDatepickerModule,FormsModule, MatDatepickerModule, MatInputModule]
})
export class DateTimePickerDialogComponent {
  selectedDate: Date;
  selectedHour: number | undefined;
  selectedMinute: number | undefined;

  hours: number[] = Array.from({ length: 24  }, (_, i) => i); // Array of hours from 0 to 23
  minutes: number[] = Array.from({ length: 60 }, (_, i) => i); // Array of minutes from 0 to 59


  constructor(
    public dialogRef: MatDialogRef<DateTimePickerDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.selectedDate = data.selectedDate || new Date();
    this.selectedHour = data.selectedHour || 0;
    this.selectedMinute = data.selectedMinute || 0;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  saveDate(): void {
    const combinedDateTime = new Date(this.selectedDate);
    if (this.selectedHour !== undefined && this.selectedMinute !== undefined) {
      combinedDateTime.setHours(this.selectedHour+1);
      combinedDateTime.setMinutes(this.selectedMinute);
      combinedDateTime.setSeconds(0);
    }
    // Make sure to format the date-time to ISO string format
    const isoDateTime = combinedDateTime.toISOString();
    this.dialogRef.close(isoDateTime);
  }

  openTimePicker(): void {
    // Logic to open time picker
  }
}
