import { NgModule } from '@angular/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
  exports: [
    MatSnackBarModule,
    MatButtonModule,
    MatGridListModule,
    MatCardModule,
    DragDropModule
  ]
})
export class MaterialModule {}
