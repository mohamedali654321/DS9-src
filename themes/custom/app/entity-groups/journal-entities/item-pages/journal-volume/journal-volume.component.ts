import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { Context } from '../../../../../../../app/core/shared/context.model';
import { ViewMode } from '../../../../../../../app/core/shared/view-mode.model';
import { JournalVolumeComponent as BaseComponent } from '../../../../../../../app/entity-groups/journal-entities/item-pages/journal-volume/journal-volume.component';
import { GenericItemPageFieldComponent } from '../../../../../../../app/item-page/simple/field-components/specific-field/generic/generic-item-page-field.component';
import { ThemedItemPageTitleFieldComponent } from '../../../../../../../app/item-page/simple/field-components/specific-field/title/themed-item-page-field.component';
import { RelatedItemsComponent } from '../../../../../../../app/item-page/simple/related-items/related-items-component';
import { DsoEditMenuComponent } from '../../../../../../../app/shared/dso-page/dso-edit-menu/dso-edit-menu.component';
import { MetadataFieldWrapperComponent } from '../../../../../../../app/shared/metadata-field-wrapper/metadata-field-wrapper.component';
import { listableObjectComponent } from '../../../../../../../app/shared/object-collection/shared/listable-object/listable-object.decorator';
import { ThemedResultsBackButtonComponent } from '../../../../../../../app/shared/results-back-button/themed-results-back-button.component';
import { ThemedThumbnailComponent } from '../../../../../../../app/thumbnail/themed-thumbnail.component';
import { TabbedRelatedEntitiesSearchComponent } from 'src/app/item-page/simple/related-entities/tabbed-related-entities-search/tabbed-related-entities-search.component';
import { ThemedMediaViewerComponent } from 'src/app/item-page/media-viewer/themed-media-viewer.component';
import { SimpleViewStatisticsComponent } from 'src/app/shared/simple-view-statistics/simple-view-statistics.component';
import { CollectionsComponent } from 'src/app/item-page/field-components/collections/collections.component';
import { KwareSocialSharingComponent } from 'src/app/shared/kware-social-sharing/kware-social-sharing.component';
import { KwareNavigateItemsComponent } from 'src/app/shared/kware-navigate-items/kware-navigate-items.component';

@listableObjectComponent('JournalVolume', ViewMode.StandalonePage, Context.Any, 'custom')
@Component({
  selector: 'ds-journal-volume',
  // styleUrls: ['./journal-volume.component.scss'],
  styleUrls: ['../../../../../../../app/entity-groups/journal-entities/item-pages/journal-volume/journal-volume.component.scss'],
  // templateUrl: './journal-volume.component.html',
  templateUrl: '../../../../../../../app/entity-groups/journal-entities/item-pages/journal-volume/journal-volume.component.html',
  standalone: true,
  imports: [
    AsyncPipe,
    DsoEditMenuComponent,
    GenericItemPageFieldComponent,
    MetadataFieldWrapperComponent,
    RelatedItemsComponent,
    RouterLink,
    ThemedItemPageTitleFieldComponent,
    ThemedResultsBackButtonComponent,
    ThemedThumbnailComponent,
    TranslateModule,
    TabbedRelatedEntitiesSearchComponent,
    ThemedMediaViewerComponent,
    SimpleViewStatisticsComponent,
    CollectionsComponent,
    KwareSocialSharingComponent,
    KwareNavigateItemsComponent
  ],
})
export class JournalVolumeComponent extends BaseComponent {
}
