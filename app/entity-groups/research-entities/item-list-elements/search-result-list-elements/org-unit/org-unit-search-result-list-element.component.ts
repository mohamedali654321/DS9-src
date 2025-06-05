import { AsyncPipe, DatePipe, NgClass, NgFor, NgIf } from "@angular/common";
import { Component } from "@angular/core";
import { RouterLink } from "@angular/router";
import { TranslateModule } from "@ngx-translate/core";

import { ViewMode } from "../../../../../core/shared/view-mode.model";
import { ThemedBadgesComponent } from "../../../../../shared/object-collection/shared/badges/themed-badges.component";
import { listableObjectComponent } from "../../../../../shared/object-collection/shared/listable-object/listable-object.decorator";
import { ItemSearchResultListElementComponent } from "../../../../../shared/object-list/search-result-list-element/item-search-result/item-types/item/item-search-result-list-element.component";
import { TruncatableComponent } from "../../../../../shared/truncatable/truncatable.component";
import { TruncatablePartComponent } from "../../../../../shared/truncatable/truncatable-part/truncatable-part.component";
import { ThemedThumbnailComponent } from "../../../../../thumbnail/themed-thumbnail.component";
import { KwareTranslatePipe } from "../../../../../shared/utils/kware-translate.pipe";
import { ViewStatisticsComponent } from "../../../../../shared/view-statistics/view-statistics.component";
import { ThemedMetadataRepresentationListComponent } from "../../../../../item-page/simple/metadata-representation-list/themed-metadata-representation-list.component";
import { PublictaionCountComponent } from "../../../../../shared/publictaion-count/publictaion-count.component";

@listableObjectComponent("OrgUnitSearchResult", ViewMode.ListElement)
@Component({
  selector: "ds-org-unit-search-result-list-element",
  styleUrls: ["./org-unit-search-result-list-element.component.scss"],
  templateUrl: "./org-unit-search-result-list-element.component.html",
  standalone: true,
  imports: [
    AsyncPipe,
    NgClass,
    RouterLink,
    // ThemedBadgesComponent,
    ThemedThumbnailComponent,
    TranslateModule,
    TruncatableComponent,
    TruncatablePartComponent,
    KwareTranslatePipe,
    ViewStatisticsComponent,
    ThemedMetadataRepresentationListComponent,
    NgIf,
    NgFor,
    DatePipe,
    PublictaionCountComponent
],
})
/**
 * The component for displaying a list element for an item search result of the type Organisation Unit
 */
export class OrgUnitSearchResultListElementComponent extends ItemSearchResultListElementComponent {}
