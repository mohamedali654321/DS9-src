import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KwareImageViewerComponent } from './kware-image-viewer.component';

describe('KwareImageViewerComponent', () => {
  let component: KwareImageViewerComponent;
  let fixture: ComponentFixture<KwareImageViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KwareImageViewerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KwareImageViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
