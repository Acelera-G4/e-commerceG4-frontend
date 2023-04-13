import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal-payment',
  templateUrl: './modal-payment.component.html',
  styleUrls: ['./modal-payment.component.css'],
})
export class ModalPaymentComponent implements OnInit {
  visible: boolean = false;
  constructor() {}

  ngOnInit() {
    // localStorage.getItem('modalpayment');
  }
}
