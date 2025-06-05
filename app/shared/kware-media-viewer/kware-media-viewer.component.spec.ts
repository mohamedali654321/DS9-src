import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KwareMediaViewerComponent } from './kware-media-viewer.component';

describe('KwareMediaViewerComponent', () => {
  let component: KwareMediaViewerComponent;
  let fixture: ComponentFixture<KwareMediaViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KwareMediaViewerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KwareMediaViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
