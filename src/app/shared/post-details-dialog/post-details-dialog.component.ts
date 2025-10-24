import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-post-details-dialog',
  imports: [MatDialogModule],
  templateUrl: './post-details-dialog.component.html',
  styleUrl: './post-details-dialog.component.scss'
})
export class PostDetailsDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { title: string; body: string },
    private ref: MatDialogRef<PostDetailsDialogComponent>
  ) {}

  close() {
    this.ref.close();
  }
}
