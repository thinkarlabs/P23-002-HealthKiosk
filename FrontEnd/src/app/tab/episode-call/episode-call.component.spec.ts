import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EpisodeCallComponent } from './episode-call.component';

describe('EpisodeCallComponent', () => {
  let component: EpisodeCallComponent;
  let fixture: ComponentFixture<EpisodeCallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EpisodeCallComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EpisodeCallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
