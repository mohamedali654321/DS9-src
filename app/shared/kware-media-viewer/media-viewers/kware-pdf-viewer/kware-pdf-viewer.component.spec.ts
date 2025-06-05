import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KwarePdfViewerComponent } from './kware-pdf-viewer.component';

describe('KwarePdfViewerComponent', () => {
  let component: KwarePdfViewerComponent;
  let fixture: ComponentFixture<KwarePdfViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KwarePdfViewerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KwarePdfViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
