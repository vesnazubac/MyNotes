import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { CdkDrag, CdkDropList} from '@angular/cdk/drag-drop';
import { MatDatepicker } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';


@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatMenuModule,
    MatToolbarModule,
    MatListModule,
    MatSidenavModule,
    FormsModule,
    RouterOutlet,
    CdkDrag,
    CdkDropList,
    MatDatepicker,
    MatNativeDateModule,
    MatSnackBarModule,

  ],
  exports: [
    CommonModule,
    MatDialogModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatMenuModule,
    MatToolbarModule,
    MatListModule,
    MatSidenavModule,
    FormsModule,
    RouterOutlet,
    CdkDrag,
    CdkDropList,
    MatDatepicker,
    MatNativeDateModule,
    MatSnackBarModule,
  ]
})
export class SharedModule { }
