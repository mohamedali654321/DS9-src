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

import { ViewMode } from "../../../../../core/shared/view-mode.model";
import { ThemedBadgesComponent } from "../../../../../shared/object-collection/shared/badges/themed-badges.component";
import { listableObjectComponent } from "../../../../../shared/object-collection/shared/listable-object/listable-object.decorator";
import { ItemSearchResultListElementComponent } from "../../../../../shared/object-list/search-result-list-element/item-search-result/item-types/item/item-search-result-list-element.component";
import { TruncatableComponent } from "../../../../../shared/truncatable/truncatable.component";
import { TruncatablePartComponent } from "../../../../../shared/truncatable/truncatable-part/truncatable-part.component";
import { ThemedThumbnailComponent } from "../../../../../thumbnail/themed-thumbnail.component";
import { KwareTranslatePipe } from "../../../../../shared/utils/kware-translate.pipe";
import { TranslateModule } from "@ngx-translate/core";
import { ThemedMetadataRepresentationListComponent } from "src/app/item-page/simple/metadata-representation-list/themed-metadata-representation-list.component";
import { ViewStatisticsComponent } from "src/app/shared/view-statistics/view-statistics.component";
import { PublictaionCountComponent } from "../../../../../shared/publictaion-count/publictaion-count.component";

@listableObjectComponent("JournalVolumeSearchResult", ViewMode.ListElement)
@Component({
  selector: "ds-journal-volume-search-result-list-element",
  styleUrls: ["./journal-volume-search-result-list-element.component.scss"],
  templateUrl: "./journal-volume-search-result-list-element.component.html",
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
    ThemedMetadataRepresentationListComponent,
    ViewStatisticsComponent,
    NgIf,
    NgFor,
    NgClass,
    NgStyle,
    DatePipe,
    TranslateModule,
    PublictaionCountComponent
],
})
/**
 * The component for displaying a list element for an item search result of the type Journal Volume
 */
export class JournalVolumeSearchResultListElementComponent extends ItemSearchResultListElementComponent {}
