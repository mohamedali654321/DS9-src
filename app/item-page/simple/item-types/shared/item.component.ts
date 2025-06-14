import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { map, take } from "rxjs/operators";

import { environment } from "../../../../../environments/environment";
import { RouteService } from "../../../../core/services/route.service";
import { Item } from "../../../../core/shared/item.model";
import { ViewMode } from "../../../../core/shared/view-mode.model";
import { getItemPageRoute } from "../../../item-page-routing-paths";
import {
  getDSpaceQuery,
  isIiifEnabled,
  isIiifSearchEnabled,
} from "./item-iiif-utils";
import { KwareCitationComponent } from "src/app/shared/kware-citation/kware-citation.component";
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { hasValue } from "src/app/shared/empty.util";

@Component({
  selector: "ds-item",
  template: "",
  standalone: true,
})
/**
 * A generic component for displaying metadata and relations of an item
 */
export class ItemComponent implements OnInit {
  @Input() object: Item;

  /**
   * Whether to show the badge label or not
   */
  @Input() showLabel = true;

  /**
   * The viewmode we matched on to get this component
   */
  @Input() viewMode: ViewMode;

  /**
   * This regex matches previous routes. The button is shown
   * for matching paths and hidden in other cases.
   */
  previousRoute =
    /^(\/search|\/browse|\/collections|\/admin\/search|\/mydspace)/;

  /**
   * Used to show or hide the back to results button in the view.
   */
  showBackButton$: Observable<boolean>;

  /**
   * Route to the item page
   */
  itemPageRoute: string;

  /**
   * Enables the mirador component.
   */
  iiifEnabled: boolean;

  /**
   * Used to configure search in mirador.
   */
  iiifSearchEnabled: boolean;

  /**
   * The query term from the previous dspace search.
   */
  iiifQuery$: Observable<string>;

  mediaViewer;

  /**
   * Enables display of geospatial item page fields
   */
  geospatialItemPageFieldsEnabled = false;

  modalRef: NgbModalRef;

  accessStatusConfigs = {
    "access-status.unknown.listelement.badge": {
      icon: "fa-solid fa-question",
      style: "background-color: #767676 !important;",
    },
    "access-status.restricted.listelement.badge": {
      icon: "fa-solid fa-ban",
      style: "background-color: #d33b36 !important;",
    },
    "access-status.open.access.listelement.badge": {
      icon: "fa-solid fa-unlock",
      style: "background-color: #3a833a !important;",
    },
    "access-status.metadata.only.listelement.badge": {
      icon: "fa-solid fa-file-invoice",
      style: "background-color: #2f6fa7  !important;",
    },
    "access-status.embargo.listelement.badge": {
      icon: "fa-regular fa-clock",
      style: "background-color: #eb9419 !important;",
    },
  };

  locale: any; //kware-edit

  lang: boolean; //kware-edit

  constructor(
    protected routeService: RouteService,
    protected router: Router,
    protected modalService: NgbModal
  ) {
    this.mediaViewer = environment.mediaViewer;
    this.geospatialItemPageFieldsEnabled =
      environment.geospatialMapViewer.enableItemPageFields;
  }

  /**
   * The function used to return to list from the item.
   */
  back = () => {
    this.routeService
      .getPreviousUrl()
      .pipe(take(1))
      .subscribe((url) => {
        this.router.navigateByUrl(url);
      });
  };

  ngOnInit(): void {
    if (typeof window === "object" && hasValue(window.localStorage)) {
      this.locale = window.localStorage.getItem("selectedLangCode");
    }
    //kware-edit
    this.lang = this.locale === "ar" ? true : false;
    this.itemPageRoute = getItemPageRoute(this.object);
    // hide/show the back button
    this.showBackButton$ = this.routeService.getPreviousUrl().pipe(
      map((url: string) => this.previousRoute.test(url)),
      take(1)
    );
    // check to see if iiif viewer is required.
    this.iiifEnabled = isIiifEnabled(this.object);
    this.iiifSearchEnabled = isIiifSearchEnabled(this.object);
    if (this.iiifSearchEnabled) {
      this.iiifQuery$ = getDSpaceQuery(this.object, this.routeService);
    }
  }
  showModal() {
    this.modalRef = this.modalService.open(KwareCitationComponent, {
      size: "lg",
    });
    const modalComp = this.modalRef.componentInstance;
    modalComp.object = this.object;
  }
}
