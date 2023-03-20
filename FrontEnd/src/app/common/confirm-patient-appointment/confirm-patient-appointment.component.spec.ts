import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmPatientAppointmentComponent } from './confirm-patient-appointment.component';

describe('ConfirmPatientAppointmentComponent', () => {
  let component: ConfirmPatientAppointmentComponent;
  let fixture: ComponentFixture<ConfirmPatientAppointmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmPatientAppointmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmPatientAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
