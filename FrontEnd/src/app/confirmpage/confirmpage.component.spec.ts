import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmpageComponent } from './confirmpage.component';

describe('ConfirmpageComponent', () => {
  let component: ConfirmpageComponent;
  let fixture: ComponentFixture<ConfirmpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmpageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
