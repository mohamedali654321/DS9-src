import { AsyncPipe, DatePipe, NgClass, NgIf, NgStyle } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { ViewMode } from '../../../../../core/shared/view-mode.model';
import { focusShadow } from '../../../../../shared/animations/focus';
import { ThemedBadgesComponent } from '../../../../../shared/object-collection/shared/badges/themed-badges.component';
import { listableObjectComponent } from '../../../../../shared/object-collection/shared/listable-object/listable-object.decorator';
import { ItemSearchResultGridElementComponent } from '../../../../../shared/object-grid/search-result-grid-element/item-search-result/item/item-search-result-grid-element.component';
import { TruncatableComponent } from '../../../../../shared/truncatable/truncatable.component';
import { TruncatablePartComponent } from '../../../../../shared/truncatable/truncatable-part/truncatable-part.component';
import { ThemedThumbnailComponent } from '../../../../../thumbnail/themed-thumbnail.component';
import { KwareTranslatePipe } from "../../../../../shared/utils/kware-translate.pipe";
import { ThemedMetadataRepresentationListComponent } from "../../../../../item-page/simple/metadata-representation-list/themed-metadata-representation-list.component";
import { ViewStatisticsComponent } from "../../../../../shared/view-statistics/view-statistics.component";
import { PublictaionCountComponent } from "../../../../../shared/publictaion-count/publictaion-count.component";

@listableObjectComponent('OrgUnitSearchResult', ViewMode.GridElement)
@Component({
  selector: 'ds-org-unit-search-result-grid-element',
  styleUrls: ['./org-unit-search-result-grid-element.component.scss'],
  templateUrl: './org-unit-search-result-grid-element.component.html',
  animations: [focusShadow],
  standalone: true,
  imports: [
    AsyncPipe,
    RouterLink,
    // ThemedBadgesComponent,
    ThemedThumbnailComponent,
    TranslateModule,
    TruncatableComponent,
    TruncatablePartComponent,
    KwareTranslatePipe,
    ThemedMetadataRepresentationListComponent,
    ViewStatisticsComponent,
    NgIf,
    NgStyle,
    NgClass,
    DatePipe,
    PublictaionCountComponent
],
})
/**
 * The component for displaying a grid element for an item search result of the type Organisation Unit
 */
export class OrgUnitSearchResultGridElementComponent extends ItemSearchResultGridElementComponent {
}
