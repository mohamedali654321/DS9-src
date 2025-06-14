import { Component } from '@angular/core';
import { ViewMode } from '../../../../core/shared/view-mode.model';
import { listableObjectComponent } from '../../../../shared/object-collection/shared/listable-object/listable-object.decorator';
import { ItemComponent } from '../../../../item-page/simple/item-types/shared/item.component';
import { NgIf, AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ThemedMediaViewerComponent } from 'src/app/item-page/media-viewer/themed-media-viewer.component';
import { GenericItemPageFieldComponent } from 'src/app/item-page/simple/field-components/specific-field/generic/generic-item-page-field.component';
import { ItemPageImgFieldComponent } from 'src/app/item-page/simple/field-components/specific-field/img/item-page-img-field.component';
import { ThemedItemPageTitleFieldComponent } from 'src/app/item-page/simple/field-components/specific-field/title/themed-item-page-field.component';
import { TabbedRelatedEntitiesSearchComponent } from 'src/app/item-page/simple/related-entities/tabbed-related-entities-search/tabbed-related-entities-search.component';
import { RelatedItemsComponent } from 'src/app/item-page/simple/related-items/related-items-component';
import { DsoEditMenuComponent } from 'src/app/shared/dso-page/dso-edit-menu/dso-edit-menu.component';
import { MetadataFieldWrapperComponent } from 'src/app/shared/metadata-field-wrapper/metadata-field-wrapper.component';
import { ThemedResultsBackButtonComponent } from 'src/app/shared/results-back-button/themed-results-back-button.component';
import { ThemedThumbnailComponent } from 'src/app/thumbnail/themed-thumbnail.component';
import { SimpleViewStatisticsComponent } from "../../../../shared/simple-view-statistics/simple-view-statistics.component";
import { CollectionsComponent } from "../../../../item-page/field-components/collections/collections.component";
import { KwareSocialSharingComponent } from "../../../../shared/kware-social-sharing/kware-social-sharing.component";
import { KwareNavigateItemsComponent } from "../../../../shared/kware-navigate-items/kware-navigate-items.component";

@listableObjectComponent('Place', ViewMode.StandalonePage)
@Component({
  selector: 'ds-place',
  templateUrl: './place.component.html',
  styleUrls: ['./place.component.scss'],
  standalone: true,
  imports: [
    NgIf,
    ThemedResultsBackButtonComponent,
    ThemedItemPageTitleFieldComponent,
    DsoEditMenuComponent,
    MetadataFieldWrapperComponent,
    ThemedThumbnailComponent,
    GenericItemPageFieldComponent,
    RelatedItemsComponent,
    RouterLink,
    TabbedRelatedEntitiesSearchComponent,
    AsyncPipe,
    TranslateModule,
    ItemPageImgFieldComponent,
    ThemedMediaViewerComponent,
    SimpleViewStatisticsComponent,
    CollectionsComponent,
    KwareSocialSharingComponent,
    KwareNavigateItemsComponent
],
})
export class PlaceComponent extends ItemComponent {}
