import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemFilesMenuComponent } from './item-files-menu.component';

describe('ItemFilesMenuComponent', () => {
  let component: ItemFilesMenuComponent;
  let fixture: ComponentFixture<ItemFilesMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ItemFilesMenuComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemFilesMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
