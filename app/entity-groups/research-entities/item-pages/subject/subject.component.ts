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
import { ThemedMetadataRepresentationListComponent } from 'src/app/item-page/simple/metadata-representation-list/themed-metadata-representation-list.component';
import { ItemPageUriFieldComponent } from 'src/app/item-page/simple/field-components/specific-field/uri/item-page-uri-field.component';
import { CollectionsComponent } from 'src/app/item-page/field-components/collections/collections.component';
import { SimpleViewStatisticsComponent } from "../../../../shared/simple-view-statistics/simple-view-statistics.component";


@listableObjectComponent('Subject', ViewMode.StandalonePage)
@Component({
  selector: 'ds-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.scss'],
  standalone: true,
  imports: [
    NgIf,
    ThemedResultsBackButtonComponent,
    ThemedItemPageTitleFieldComponent,
    ThemedMetadataRepresentationListComponent,
    DsoEditMenuComponent,
    MetadataFieldWrapperComponent,
    ThemedThumbnailComponent,
    GenericItemPageFieldComponent,
    RelatedItemsComponent,
    RouterLink,
    TabbedRelatedEntitiesSearchComponent,
    AsyncPipe,
    ItemPageUriFieldComponent,
    CollectionsComponent,
    TranslateModule,
    ItemPageImgFieldComponent,
    ThemedMediaViewerComponent,
    SimpleViewStatisticsComponent
],
})
export class SubjectComponent extends ItemComponent {}
