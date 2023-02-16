import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhoneRegistrationComponent } from './phone-registration.component';

describe('PhoneRegistrationComponent', () => {
  let component: PhoneRegistrationComponent;
  let fixture: ComponentFixture<PhoneRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhoneRegistrationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhoneRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
