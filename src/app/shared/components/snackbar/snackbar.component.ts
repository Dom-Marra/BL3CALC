import { Component, Inject, OnInit } from '@angular/core';
import { MatSnackBarRef, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.scss']
})
export class SnackbarComponent implements OnInit {

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: {message: string, theme?: 'primary' | 'accent'}, private snackbarRef: MatSnackBarRef<SnackbarComponent>) {
    this.snackbarRef._dismissAfter(2500);
  }

  ngOnInit(): void {
  }

}
