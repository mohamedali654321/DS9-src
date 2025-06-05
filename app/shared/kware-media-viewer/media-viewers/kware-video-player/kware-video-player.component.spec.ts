import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KwareVideoPlayerComponent } from './kware-video-player.component';

describe('KwareVideoPlayerComponent', () => {
  let component: KwareVideoPlayerComponent;
  let fixture: ComponentFixture<KwareVideoPlayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KwareVideoPlayerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KwareVideoPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
