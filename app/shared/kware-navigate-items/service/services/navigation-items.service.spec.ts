import { TestBed } from '@angular/core/testing';

import { NavigationItemsService } from './navigation-items.service';

describe('NavigationItemsService', () => {
  let service: NavigationItemsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NavigationItemsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
