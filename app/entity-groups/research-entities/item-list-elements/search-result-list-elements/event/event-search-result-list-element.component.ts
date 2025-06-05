import { Component } from "@angular/core";
import { ViewMode } from "../../../../../core/shared/view-mode.model";
import { listableObjectComponent } from "../../../../../shared/object-collection/shared/listable-object/listable-object.decorator";
import { ItemSearchResultListElementComponent } from "../../../../../shared/object-list/search-result-list-element/item-search-result/item-types/item/item-search-result-list-element.component";
import {
  NgIf,
  AsyncPipe,
  DatePipe,
  NgClass,
  NgFor,
  NgStyle,
} from "@angular/common";
import { RouterLink } from "@angular/router";
import { TranslateModule } from "@ngx-translate/core";
import { ThemedMetadataRepresentationListComponent } from "src/app/item-page/simple/metadata-representation-list/themed-metadata-representation-list.component";
import { ThemedBadgesComponent } from "src/app/shared/object-collection/shared/badges/themed-badges.component";
import { ThemedTypeBadgeComponent } from "src/app/shared/object-collection/shared/badges/type-badge/themed-type-badge.component";
import { TruncatablePartComponent } from "src/app/shared/truncatable/truncatable-part/truncatable-part.component";
import { TruncatableComponent } from "src/app/shared/truncatable/truncatable.component";
import { KwareTranslatePipe } from "src/app/shared/utils/kware-translate.pipe";
import { ViewStatisticsComponent } from "src/app/shared/view-statistics/view-statistics.component";
import { ThemedThumbnailComponent } from "src/app/thumbnail/themed-thumbnail.component";
import { PublictaionCountComponent } from "../../../../../shared/publictaion-count/publictaion-count.component";

@listableObjectComponent("EventSearchResult", ViewMode.ListElement)
@Component({
  selector: "ds-event-search-result-list-element",
  styleUrls: ["./event-search-result-list-element.component.scss"],
  templateUrl: "./event-search-result-list-element.component.html",
  standalone: true,
  imports: [
    TruncatableComponent,
    NgIf,
    NgFor,
    RouterLink,
    ThemedThumbnailComponent,
    // ThemedBadgesComponent,
    TruncatablePartComponent,
    AsyncPipe,
    DatePipe,
    TranslateModule,
    NgClass,
    KwareTranslatePipe,
    // NgStyle,
    ViewStatisticsComponent,
    PublictaionCountComponent
],
})
/**
 * The component for displaying a list element for an item search result of the type Organisation Unit
 */
export class EventSearchResultListElementComponent extends ItemSearchResultListElementComponent {
  /**
   * Display thumbnail if required by configuration
   */
  showThumbnails: boolean;

  ngOnInit(): void {
    super.ngOnInit();
    this.showThumbnails = this.appConfig.browseBy.showThumbnails;
  }
}
