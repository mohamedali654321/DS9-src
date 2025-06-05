import {
  AsyncPipe,
  DatePipe,
  NgClass,
  NgFor,
  NgIf,
  NgStyle,
} from "@angular/common";
import { Component } from "@angular/core";
import { RouterLink } from "@angular/router";

import { Context } from "../../../../../../../../../app/core/shared/context.model";
import { ViewMode } from "../../../../../../../../../app/core/shared/view-mode.model";
import { ThemedBadgesComponent } from "../../../../../../../../../app/shared/object-collection/shared/badges/themed-badges.component";
import { ItemSearchResult } from "../../../../../../../../../app/shared/object-collection/shared/item-search-result.model";
import { listableObjectComponent } from "../../../../../../../../../app/shared/object-collection/shared/listable-object/listable-object.decorator";
import { ItemSearchResultListElementComponent as BaseComponent } from "../../../../../../../../../app/shared/object-list/search-result-list-element/item-search-result/item-types/item/item-search-result-list-element.component";
import { TruncatableComponent } from "../../../../../../../../../app/shared/truncatable/truncatable.component";
import { TruncatablePartComponent } from "../../../../../../../../../app/shared/truncatable/truncatable-part/truncatable-part.component";
import { ThemedThumbnailComponent } from "../../../../../../../../../app/thumbnail/themed-thumbnail.component";
import { TranslateModule } from "@ngx-translate/core";
import { KwareCommaConvertPipe } from "src/app/shared/utils/kware-comma-convert.pipe";
import { KwareTranslatePipe } from "src/app/shared/utils/kware-translate.pipe";
import { ThemedMetadataRepresentationListComponent } from "src/app/item-page/simple/metadata-representation-list/themed-metadata-representation-list.component";
import { ViewStatisticsComponent } from "src/app/shared/view-statistics/view-statistics.component";
import { PublictaionCountComponent } from "src/app/shared/publictaion-count/publictaion-count.component";

@listableObjectComponent(
  "PublicationSearchResult",
  ViewMode.ListElement,
  Context.Any,
  "custom"
)
@listableObjectComponent(
  ItemSearchResult,
  ViewMode.ListElement,
  Context.Any,
  "custom"
)
@Component({
  selector: "ds-item-search-result-list-element",
  // styleUrls: ['./item-search-result-list-element.component.scss'],
  styleUrls: [
    "../../../../../../../../../app/shared/object-list/search-result-list-element/item-search-result/item-types/item/item-search-result-list-element.component.scss",
  ],
  // templateUrl: './item-search-result-list-element.component.html',
  templateUrl:
    "../../../../../../../../../app/shared/object-list/search-result-list-element/item-search-result/item-types/item/item-search-result-list-element.component.html",
  standalone: true,
  imports: [
    AsyncPipe,
    NgClass,
    RouterLink,
    ThemedBadgesComponent,
    ThemedThumbnailComponent,
    TruncatableComponent,
    TruncatablePartComponent,
    KwareTranslatePipe,
    TranslateModule,
    // KwareCommaConvertPipe,
    ThemedMetadataRepresentationListComponent,
    ViewStatisticsComponent,
    NgFor,
    NgIf,
    NgClass,
    // NgStyle,
    DatePipe,
    PublictaionCountComponent
  ],
})
export class ItemSearchResultListElementComponent extends BaseComponent {}
