import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EpisodeConfirmComponent } from './episode-confirm.component';

describe('EpisodeConfirmComponent', () => {
  let component: EpisodeConfirmComponent;
  let fixture: ComponentFixture<EpisodeConfirmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EpisodeConfirmComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EpisodeConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
