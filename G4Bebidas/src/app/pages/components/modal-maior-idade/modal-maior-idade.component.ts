import { HomeComponent } from './../../home/home.component';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';



@Component({
  selector: 'app-modal-maior-idade',
  templateUrl: './modal-maior-idade.component.html',
  styleUrls: ['./modal-maior-idade.component.css'],
  
})
export class ModalMaiorIdadeComponent implements OnInit {


  @ViewChild('maiorIdadeCheckbox') maiorIdadeCheckbox: ElementRef<HTMLInputElement>;
  rememberAnswerChecked = false;


  constructor(private homeComponent: HomeComponent) {}

  ngOnInit() {
    const rememberedAnswer = localStorage.getItem('maiorIdadeCheckbox');
    if (rememberedAnswer === 'true') {
      this.homeComponent.closeDialog();
    }
  }

  closeDialog() {
    this.homeComponent.closeDialog();
  }

  rememberAnswer() {
    const checked = this.maiorIdadeCheckbox.nativeElement.checked;
    localStorage.setItem('maiorIdadeCheckbox', checked ? 'true' : 'false');
  }
  
}
