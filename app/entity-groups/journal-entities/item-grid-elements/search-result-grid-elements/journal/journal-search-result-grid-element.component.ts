import { AsyncPipe, DatePipe, NgClass, NgFor, NgIf, NgStyle } from "@angular/common";
import { Component } from "@angular/core";
import { RouterLink } from "@angular/router";
import { TranslateModule } from "@ngx-translate/core";

import { ViewMode } from "../../../../../core/shared/view-mode.model";
import { focusShadow } from "../../../../../shared/animations/focus";
import { ThemedBadgesComponent } from "../../../../../shared/object-collection/shared/badges/themed-badges.component";
import { listableObjectComponent } from "../../../../../shared/object-collection/shared/listable-object/listable-object.decorator";
import { ItemSearchResultGridElementComponent } from "../../../../../shared/object-grid/search-result-grid-element/item-search-result/item/item-search-result-grid-element.component";
import { TruncatableComponent } from "../../../../../shared/truncatable/truncatable.component";
import { TruncatablePartComponent } from "../../../../../shared/truncatable/truncatable-part/truncatable-part.component";
import { ThemedThumbnailComponent } from "../../../../../thumbnail/themed-thumbnail.component";
import { KwareTranslatePipe } from "../../../../../shared/utils/kware-translate.pipe";
import { KwareCommaConvertPipe } from "../../../../../shared/utils/kware-comma-convert.pipe";
import { ThemedMetadataRepresentationListComponent } from "../../../../../item-page/simple/metadata-representation-list/themed-metadata-representation-list.component";
import { ViewStatisticsComponent } from "../../../../../shared/view-statistics/view-statistics.component";
import { PublictaionCountComponent } from "../../../../../shared/publictaion-count/publictaion-count.component";

@listableObjectComponent("JournalSearchResult", ViewMode.GridElement)
@Component({
  selector: "ds-journal-search-result-grid-element",
  styleUrls: ["./journal-search-result-grid-element.component.scss"],
  templateUrl: "./journal-search-result-grid-element.component.html",
  animations: [focusShadow],
  standalone: true,
  imports: [
    AsyncPipe,
    RouterLink,
    ThemedBadgesComponent,
    ThemedThumbnailComponent,
    TranslateModule,
    TruncatableComponent,
    TruncatablePartComponent,
    KwareTranslatePipe,
    KwareCommaConvertPipe,
    ThemedMetadataRepresentationListComponent,
    ViewStatisticsComponent,
    NgIf,
    NgFor,
    NgClass,
    NgStyle,
    DatePipe,
    PublictaionCountComponent
],
})
/**
 * The component for displaying a grid element for an item search result of the type Journal
 */
export class JournalSearchResultGridElementComponent extends ItemSearchResultGridElementComponent {}
