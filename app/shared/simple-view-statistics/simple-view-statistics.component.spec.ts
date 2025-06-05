import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewStatisticsComponent } from './view-statistics.component';

describe('ViewStatisticsComponent', () => {
  let component: ViewStatisticsComponent;
  let fixture: ComponentFixture<ViewStatisticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewStatisticsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
