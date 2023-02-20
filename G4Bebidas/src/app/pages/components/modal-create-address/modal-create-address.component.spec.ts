import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCreateAddressComponent } from './modal-create-address.component';

describe('ModalCreateAddressComponent', () => {
  let component: ModalCreateAddressComponent;
  let fixture: ComponentFixture<ModalCreateAddressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalCreateAddressComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalCreateAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
