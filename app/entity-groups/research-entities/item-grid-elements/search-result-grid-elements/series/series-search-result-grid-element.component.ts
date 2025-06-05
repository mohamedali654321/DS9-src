import { Component } from '@angular/core';
import { listableObjectComponent } from '../../../../../shared/object-collection/shared/listable-object/listable-object.decorator';
import { ViewMode } from '../../../../../core/shared/view-mode.model';
import { focusShadow } from '../../../../../shared/animations/focus';
import { ItemSearchResultGridElementComponent } from '../../../../../shared/object-grid/search-result-grid-element/item-search-result/item/item-search-result-grid-element.component';
import { hasValue } from 'src/app/shared/empty.util'; // kware-edit
import { NgIf, AsyncPipe, DatePipe, NgClass,NgFor, NgStyle } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ThemedMetadataRepresentationListComponent } from 'src/app/item-page/simple/metadata-representation-list/themed-metadata-representation-list.component';
import { ThemedBadgesComponent } from 'src/app/shared/object-collection/shared/badges/themed-badges.component';
import { ThemedTypeBadgeComponent } from 'src/app/shared/object-collection/shared/badges/type-badge/themed-type-badge.component';
import { TruncatablePartComponent } from 'src/app/shared/truncatable/truncatable-part/truncatable-part.component';
import { TruncatableComponent } from 'src/app/shared/truncatable/truncatable.component';
import { KwareTranslatePipe } from 'src/app/shared/utils/kware-translate.pipe';
import { ViewStatisticsComponent } from 'src/app/shared/view-statistics/view-statistics.component';
import { ThemedThumbnailComponent } from 'src/app/thumbnail/themed-thumbnail.component';
import { PublictaionCountComponent } from "../../../../../shared/publictaion-count/publictaion-count.component";

@listableObjectComponent('SeriesSearchResult', ViewMode.GridElement)
@Component({
  selector: 'ds-series-search-result-grid-element',
  styleUrls: ['./series-search-result-grid-element.component.scss'],
  templateUrl: './series-search-result-grid-element.component.html',
  animations: [focusShadow] ,
  standalone: true,
  imports: [
    TruncatableComponent,
    NgIf,
    NgFor,
    RouterLink,
    ThemedThumbnailComponent,
    ThemedBadgesComponent,
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
 * The component for displaying a grid element for an item search result of the type Organisation Unit
 */
export class SeriesSearchResultGridElementComponent extends ItemSearchResultGridElementComponent {
    // kware-edit
    // put comma ',' to '،' if language  is Arabic
   regxComma(): string{
    if ((typeof window === 'object' && hasValue(window.localStorage)) && window.localStorage.getItem('selectedLangCode')  === 'ar') {return '،';} else {return ',';}
  }
  // kware-edit end
}
