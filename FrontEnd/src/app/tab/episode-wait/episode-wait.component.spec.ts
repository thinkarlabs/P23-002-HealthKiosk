import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EpisodeWaitComponent } from './episode-wait.component';

describe('EpisodeWaitComponent', () => {
  let component: EpisodeWaitComponent;
  let fixture: ComponentFixture<EpisodeWaitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EpisodeWaitComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EpisodeWaitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
