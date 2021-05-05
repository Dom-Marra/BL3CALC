import { Component, Inject, OnInit } from '@angular/core';
import { DocumentReference } from '@angular/fire/firestore';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-save-dialog',
  templateUrl: './save-dialog.component.html',
  styleUrls: ['./save-dialog.component.scss']
})
export class SaveDialogComponent implements OnInit {

  public status: 'loading' | 'success' | 'error' = 'loading';
  public message: string = '';
  public copied: boolean = false;

  constructor(@Inject(MAT_DIALOG_DATA) public data: Promise<DocumentReference<unknown>>, private dialogRef: MatDialogRef<SaveDialogComponent>) { 
    
    this.dialogRef.addPanelClass('save-dialog');

    this.data.then(doc => {
      this.message = 'https://bl3calc.com/build/skilltrees?build=' + doc.id;
      this.status = 'success';
    }).catch(() => {
      this.message = "Sorry, there was an error during the save. Please try again."
    });
  }

  ngOnInit(): void {
  }
}
