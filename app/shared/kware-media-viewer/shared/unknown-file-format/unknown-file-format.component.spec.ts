import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnknownFileFormatComponent } from './unknown-file-format.component';

describe('UnknownFileFormatComponent', () => {
  let component: UnknownFileFormatComponent;
  let fixture: ComponentFixture<UnknownFileFormatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UnknownFileFormatComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(UnknownFileFormatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
