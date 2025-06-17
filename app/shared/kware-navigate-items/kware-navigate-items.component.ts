import { Component, EventEmitter, Input, Output } from "@angular/core";
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { BrowseService } from "src/app/core/browse/browse.service";
import { PaginationService } from "src/app/core/pagination/pagination.service";
import { Item } from "src/app/core/shared/item.model";
import { SearchService } from "src/app/core/shared/search/search.service";
import { PaginationComponentOptions } from "../pagination/pagination-component-options.model";
import { environment } from "src/environments/environment";
import {
  SortDirection,
  SortOptions,
} from "src/app/core/cache/models/sort-options.model";
import { RemoteData } from "src/app/core/data/remote-data";
import { PaginatedList } from "src/app/core/data/paginated-list.model";
import { BehaviorSubject, Observable } from "rxjs";
import { PaginatedSearchOptions } from "../search/models/paginated-search-options.model";
import { DSpaceObjectType } from "src/app/core/shared/dspace-object-type.model";
import { toDSpaceObjectListRD } from "src/app/core/shared/operators";
import { getItemPageRoute } from "src/app/item-page/item-page-routing-paths";
import { AsyncPipe, NgClass, NgIf } from "@angular/common";
import { VarDirective } from "../utils/var.directive";
import { TranslateModule } from "@ngx-translate/core";
import { NavigationItemsService } from "./service/services/navigation-items.service";
import { NgbTooltipModule } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "ds-kware-navigate-items",
  standalone: true,
  imports: [
    AsyncPipe,
    NgIf,
    NgClass,
    VarDirective,
    TranslateModule,
    RouterLink,
    NgbTooltipModule,
  ],
  templateUrl: "./kware-navigate-items.component.html",
  styleUrl: "./kware-navigate-items.component.scss",
})
export class KwareNavigateItemsComponent {
  @Input() currentPage: number = 1; // Current page number
  @Input() totalPages: number = 1; // Total number of pages
  @Input() item: Item;
  @Input() collectionId: string;
  items$ = new BehaviorSubject([]);
  itemsID$ = new BehaviorSubject(0);
  itemId;
  back$ = new BehaviorSubject(null);
  URLBACK$ = new BehaviorSubject(null);
  Params$ = new BehaviorSubject(null);
  /**
   * Route to the item page
   */
  itemPageRoute: string;

  paginationConfig: PaginationComponentOptions;
  sortConfig: SortOptions;
  constructor(
    private browseService: BrowseService,
    private paginationService: PaginationService,
    private searchService: SearchService,
    protected router: Router,
    protected navigationItemsService: NavigationItemsService,
    private route: ActivatedRoute
  ) {
    this.paginationConfig = Object.assign(new PaginationComponentOptions(), {
      id: "hp",
      pageSize: 5,
      currentPage: 1,
      maxSize: 1,
    });
    this.sortConfig = new SortOptions(
      environment.homePage.recentSubmissions.sortField,
      SortDirection.DESC
    );
  }

  back(url): string {
    url
      .replace(/%40/gi, "@")
      .replace(/%3A/gi, ":")
      .replace(/%24/gi, "$")
      .replace(/%2C/gi, ",")
      .replace(/%3B/gi, ";")
      .replace(/%2B/gi, "+")
      .replace(/%3D/gi, "=")
      .replace(/%3F/gi, "?")
      .replace(/%2F/gi, "/");
    return decodeURIComponent(url);
  }

  ngOnInit(): void {
    this.navigationItemsService.currentResultsRDNavigation$.subscribe((res) => {
      if (res.length > 0) {
        this.navigationItemsService.currentResultRoute$.subscribe((res) => {
          this.back$.next(res);
        });

        this.items$.next(res);
        this.items$.subscribe((vals) => {
          for (let index = 0; index < vals.length; index++) {
            if (this.item.uuid === vals[index]?.indexableObject?.uuid) {
              this.itemId = index;
              this.itemsID$.next(index);
            }
          }
        });
      }

      // if (res.length <= 0) {
      //   this.item.owningCollection.subscribe((collection) => {
      //     this.back$.next(`/collections/${collection?.payload?.uuid}`);
      //     this.searchService
      //       .search(
      //         new PaginatedSearchOptions({
      //           configuration: "collection",
      //           scope: collection?.payload?.uuid,
      //           pagination: this.paginationConfig,
      //           dsoTypes: [DSpaceObjectType.ITEM],
      //           sort: this.sortConfig,
      //         }),
      //         undefined,
      //         undefined,
      //         undefined
      //       )
      //       .subscribe((res) => {
      //         for (
      //           let page = 1;
      //           page <= res.payload?.pageInfo.totalPages;
      //           page++
      //         ) {
      //           this.searchService
      //             .search(
      //               new PaginatedSearchOptions({
      //                 configuration: "collection",
      //                 scope: collection?.payload?.uuid,
      //                 pagination: Object.assign(
      //                   new PaginationComponentOptions(),
      //                   {
      //                     id: "hp",
      //                     pageSize: 5,
      //                     currentPage: page,
      //                     maxSize: 1,
      //                   }
      //                 ),
      //                 dsoTypes: [DSpaceObjectType.ITEM],
      //                 sort: this.sortConfig,
      //               }),
      //               undefined,
      //               undefined,
      //               undefined
      //             )
      //             .subscribe((items) => {
      //               this.items$.next(
      //                 this.items$.getValue().concat(items.payload?.page)
      //               );
      //               this.items$.subscribe((vals) => {
      //                 for (let index = 0; index < vals.length; index++) {
      //                   if (
      //                     this.item.uuid === vals[index]?.indexableObject.uuid
      //                   ) {
      //                     this.itemId = index;
      //                     this.itemsID$.next(index);
      //                   }
      //                 }
      //               });
      //             });
      //         }
      //       });
      //   });
      // }
    });
  }

  onPrevious(item: any): string {
    if (item) {
      return (this.itemPageRoute = getItemPageRoute(item));
    }
  }

  onNext(item: any): string {
    if (item) {
      return (this.itemPageRoute = getItemPageRoute(item));
    }
  }

  // Event emitter to notify parent component about page changes
  @Output() pageChange = new EventEmitter<number>();
}
