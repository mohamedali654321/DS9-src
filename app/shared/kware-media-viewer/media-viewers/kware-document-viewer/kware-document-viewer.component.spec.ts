import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KwareDocumentViewerComponent } from './kware-document-viewer.component';

describe('KwareDocumentViewerComponent', () => {
  let component: KwareDocumentViewerComponent;
  let fixture: ComponentFixture<KwareDocumentViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KwareDocumentViewerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KwareDocumentViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
