import { Component } from '@angular/core';
import { SharedModule } from '../../common/shared.module';
import { ColorOption } from '../../models/color';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-color-picker-dialog',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './color-picker-dialog.component.html',
  styleUrl: './color-picker-dialog.component.css'
})
export class ColorPickerDialogComponent {
  selectedColor:string = '#FFFFFF';
  colors: ColorOption[] = [
    {value: '#FFFFFF', viewValue:'White'},
    {value:'#D9C4B8',viewValue:'Latte'},
    {value:'#F2DDD0',viewValue:'Cream'},
    {value:'#FFB6A3',viewValue:'Salmon'},
    {value:'#F4C2F4',viewValue:'Pastel orchid'},
    {value:'#C2C2F4',viewValue:'Mystic Slate'},
    {value:'#F4C2C2',viewValue:'Pink'},
    {value:'#AED8F2',viewValue:'Blue'},
    { value: '#A3D9CF', viewValue: 'Teal' },
    { value: '#C2F4F4', viewValue: 'Baby Blue' },
    {value:'#F7C9F6',viewValue:'Baby pink'},
    { value: '#F2DEA2', viewValue: 'Yellow' },


  ];

  constructor(private dialogRef: MatDialogRef<ColorPickerDialogComponent>) {}

  onColorSelected(event: any): void {
    if (this.selectedColor === event.value && event.value === '#FFFFFF') {
      this.dialogRef.close('#FFFFFF');
    } else {
      this.selectedColor = event.value;
      this.dialogRef.close(this.selectedColor);
    }
  }
}
