import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KwareCitationComponent } from './kware-citation.component';

describe('KwareCitationComponent', () => {
  let component: KwareCitationComponent;
  let fixture: ComponentFixture<KwareCitationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KwareCitationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KwareCitationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
