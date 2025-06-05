import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewerFileComponent } from './viewer-file.component';

describe('ViewerFileComponent', () => {
  let component: ViewerFileComponent;
  let fixture: ComponentFixture<ViewerFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewerFileComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewerFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
