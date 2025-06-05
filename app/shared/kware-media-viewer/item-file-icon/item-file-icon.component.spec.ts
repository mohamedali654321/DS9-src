import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemFileIconComponent } from './item-file-icon.component';

describe('ItemFileIconComponent', () => {
  let component: ItemFileIconComponent;
  let fixture: ComponentFixture<ItemFileIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemFileIconComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemFileIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
