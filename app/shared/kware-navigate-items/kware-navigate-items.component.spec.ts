import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KwareNavigateItemsComponent } from './kware-navigate-items.component';

describe('KwareNavigateItemsComponent', () => {
  let component: KwareNavigateItemsComponent;
  let fixture: ComponentFixture<KwareNavigateItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KwareNavigateItemsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KwareNavigateItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
