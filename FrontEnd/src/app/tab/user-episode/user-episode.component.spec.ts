import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserEpisodeComponent } from './user-episode.component';

describe('UserEpisodeComponent', () => {
  let component: UserEpisodeComponent;
  let fixture: ComponentFixture<UserEpisodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserEpisodeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserEpisodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
