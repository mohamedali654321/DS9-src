import { AsyncPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import {
  BehaviorSubject,
  combineLatest as observableCombineLatest,
  Observable,
} from 'rxjs';
import {
  distinctUntilChanged,
  map,
  startWith,
} from 'rxjs/operators';

import {
  SortDirection,
  SortOptions,
} from '../../core/cache/models/sort-options.model';
import { PaginatedList } from '../../core/data/paginated-list.model';
import { RemoteData } from '../../core/data/remote-data';
import { Context } from '../../core/shared/context.model';
import { ViewMode } from '../../core/shared/view-mode.model';
import { fadeIn } from '../animations/fade';
import {
  hasNoValue,
  hasValue,
} from '../empty.util';
import { ErrorComponent } from '../error/error.component';
import {
  HostWindowService,
  WidthCategory,
} from '../host-window.service';
import { ThemedLoadingComponent } from '../loading/themed-loading.component';
import { CollectionElementLinkType } from '../object-collection/collection-element-link.type';
import { ListableObject } from '../object-collection/shared/listable-object.model';
import { ListableObjectComponentLoaderComponent } from '../object-collection/shared/listable-object/listable-object-component-loader.component';
import { PaginationComponent } from '../pagination/pagination.component';
import { PaginationComponentOptions } from '../pagination/pagination-component-options.model';
import { BrowserOnlyPipe } from '../utils/browser-only.pipe';
import { ActivatedRoute } from '@angular/router';

@Component({
  changeDetection: ChangeDetectionStrategy.Default,
  encapsulation: ViewEncapsulation.Emulated,
  selector: 'ds-object-grid',
  styleUrls: ['./object-grid.component.scss'],
  templateUrl: './object-grid.component.html',
  animations: [fadeIn],
  standalone: true,
  imports: [
    AsyncPipe,
    BrowserOnlyPipe,
    ErrorComponent,
    ListableObjectComponentLoaderComponent,
    PaginationComponent,
    ThemedLoadingComponent,
    TranslateModule,
  ],
})

export class ObjectGridComponent implements OnInit {
  /**
   * The view mode of the this component
   */
  viewMode = ViewMode.GridElement;

  /**
   * The current pagination configuration
   */
  @Input() config: PaginationComponentOptions;

  /**
   * The current sort configuration
   */
  @Input() sortConfig: SortOptions;

  /**
   * Whether or not the pagination should be rendered as simple previous and next buttons instead of the normal pagination
   */
  @Input() showPaginator = true;

  /**
   * Whether to show the thumbnail preview
   */
  @Input() showThumbnails;

  /**
   * The whether or not the gear is hidden
   */
  @Input() hideGear = false;

  /**
   * Whether or not the pager is visible when there is only a single page of results
   */
  @Input() hidePagerWhenSinglePage = true;

  /**
   * The link type of the listable elements
   */
  @Input() linkType: CollectionElementLinkType;

  /**
   * The context of the listable elements
   */
  @Input() context: Context;

  /**
   * Option for hiding the pagination detail
   */
  @Input() hidePaginationDetail = false;

  /**
   * Behavior subject to output the current listable objects
   */
  private _objects$: BehaviorSubject<RemoteData<PaginatedList<ListableObject>>>;

  /**
   * Setter to make sure the observable is turned into an observable
   * @param objects The new objects to output
   */
  @Input() set objects(objects: RemoteData<PaginatedList<ListableObject>>) {
    this._objects$.next(objects);
  }

  /**
   * Getter to return the current objects
   */
  get objects() {
    return this._objects$.getValue();
  }

  /**
   * An event fired when the page is changed.
   * Event's payload equals to the newly selected page.
   */
  @Output() change: EventEmitter<{
    pagination: PaginationComponentOptions,
    sort: SortOptions
  }> = new EventEmitter<{
    pagination: PaginationComponentOptions,
    sort: SortOptions
  }>();

  /**
   * An event fired when the page is changed.
   * Event's payload equals to the newly selected page.
   */
  @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();

  /**
   * An event fired when the page wsize is changed.
   * Event's payload equals to the newly selected page size.
   */
  @Output() pageSizeChange: EventEmitter<number> = new EventEmitter<number>();

  /**
   * An event fired when the sort direction is changed.
   * Event's payload equals to the newly selected sort direction.
   */
  @Output() sortDirectionChange: EventEmitter<SortDirection> = new EventEmitter<SortDirection>();

  /**
   * An event fired when on of the pagination parameters changes
   */
  @Output() paginationChange: EventEmitter<any> = new EventEmitter<any>();

  /**
   * An event fired when the sort field is changed.
   * Event's payload equals to the newly selected sort field.
   */
  @Output() sortFieldChange: EventEmitter<string> = new EventEmitter<string>();

  /**
   * If showPaginator is set to true, emit when the previous button is clicked
   */
  @Output() prev = new EventEmitter<boolean>();

  /**
   * If showPaginator is set to true, emit when the next button is clicked
   */
  @Output() next = new EventEmitter<boolean>();

  data: any = {};
  columns$: Observable<ListableObject[][]>;


    isSearch: boolean;
  isBrowseSearch: boolean;

  constructor(private hostWindow: HostWindowService,private route: ActivatedRoute,) {
    this._objects$ = new BehaviorSubject(undefined);
  }

  /**
   * Initialize the instance variables
   */
  ngOnInit(): void {
      this.route.data.subscribe(data=>{data.breadcrumbKey === 'search' ? this.isSearch = true : this.isSearch = false});
    this.route.queryParams.subscribe(params => {params.source === 'browseCategory'? this.isBrowseSearch = true : this.isBrowseSearch = false})
    
    const nbColumns$ = this.hostWindow.widthCategory.pipe(
           map((widthCat: WidthCategory) => {
        switch (widthCat) {
          case WidthCategory.XL:
          case WidthCategory.LG: {
            return this.isSearch || this.isBrowseSearch || document.URL.includes('/communities/') || document.URL.includes('/collections/') || document.URL.includes('/entities/') ?  4 : 5;
          }
          case WidthCategory.MD:
          case WidthCategory.SM: {
            return 2;
          }
          default: {
            return 1;
          }
        }
      }),
      distinctUntilChanged(),
    ).pipe(startWith(this.isSearch || this.isBrowseSearch || document.URL.includes('/communities/') || document.URL.includes('/collections/') || document.URL.includes('/entities/') ?  4 : 5));

    this.columns$ = observableCombineLatest(
      nbColumns$,
      this._objects$).pipe(map(([nbColumns, objects]) => {
      if (hasValue(objects) && hasValue(objects.payload) && hasValue(objects.payload.page)) {
        const page = objects.payload.page;

        const result = [];

        page.forEach((obj: ListableObject, i: number) => {
          const colNb = i % nbColumns;
          let col = result[colNb];
          if (hasNoValue(col)) {
            col = [];
          }
          result[colNb] = [...col, obj];
        });
        return result;
      } else {
        return [];
      }
    }));
  }

  /**
   * Emits the current page when it changes
   * @param event The new page
   */
  onPageChange(event) {
    this.pageChange.emit(event);
  }
  /**
   * Emits the current page size when it changes
   * @param event The new page size
   */
  onPageSizeChange(event) {
    this.pageSizeChange.emit(event);
  }
  /**
   * Emits the current sort direction when it changes
   * @param event The new sort direction
   */
  onSortDirectionChange(event) {
    this.sortDirectionChange.emit(event);
  }

  /**
   * Emits the current sort field when it changes
   * @param event The new sort field
   */
  onSortFieldChange(event) {
    this.sortFieldChange.emit(event);
  }

  /**
   * Emits the current pagination when it changes
   * @param event The new pagination
   */
  onPaginationChange(event) {
    this.paginationChange.emit(event);
  }

  /**
   * Go to the previous page
   */
  goPrev() {
    this.prev.emit(true);
  }

  /**
  * Go to the next page
  */
  goNext() {
    this.next.emit(true);
  }

}
