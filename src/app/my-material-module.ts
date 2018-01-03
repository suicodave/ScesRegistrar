import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// tslint:disable-next-line:max-line-length
import { MatToolbarModule, MatCardModule, MatListModule, MatSnackBarModule, MatButtonModule, MatInputModule, MatDialogModule, MatMenuModule, MatSelectModule, MatSidenavModule, MatFormFieldModule, MatPaginatorModule } from '@angular/material';
@NgModule({
  imports: [
    CommonModule,
    MatToolbarModule,
    MatCardModule,
    MatListModule,
    MatSnackBarModule,
    MatButtonModule,
    MatInputModule,
    MatDialogModule,
    MatMenuModule,
    MatSelectModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatPaginatorModule
  ],
  exports: [
    MatToolbarModule,
    MatCardModule,
    MatListModule,
    MatSnackBarModule,
    MatButtonModule,
    MatInputModule,
    MatDialogModule,
    MatMenuModule,
    MatSelectModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatPaginatorModule
  ],
  declarations: []
})
export class MyMaterialModule { }
