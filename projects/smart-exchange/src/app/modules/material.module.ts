import { NgModule } from '@angular/core';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  exports: [
    MatSnackBarModule,
    MatButtonModule,
    MatGridListModule,
    MatCardModule,
    MatIconModule,
    DragDropModule,
    MatListModule,
    MatDividerModule,
    MatSelectModule,
    MatInputModule
  ]
})
export class MaterialModule {}
