import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  display: boolean = false;

  showDialog() {
    this.display = true;
  }
  closeDialog() {
    this.display = false;
  }
  ngOnInit(): void {
    this.showDialog();
  }
}
