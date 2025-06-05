import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestACopyComponent } from './request-a-copy.component';

describe('RequestACopyComponent', () => {
  let component: RequestACopyComponent;
  let fixture: ComponentFixture<RequestACopyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RequestACopyComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(RequestACopyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
