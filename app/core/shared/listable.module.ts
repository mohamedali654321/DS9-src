import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { CollectionAdminSearchResultGridElementComponent } from '../../admin/admin-search-page/admin-search-results/admin-search-result-grid-element/collection-search-result/collection-admin-search-result-grid-element.component';
import { CommunityAdminSearchResultGridElementComponent } from '../../admin/admin-search-page/admin-search-results/admin-search-result-grid-element/community-search-result/community-admin-search-result-grid-element.component';
import { ItemAdminSearchResultGridElementComponent } from '../../admin/admin-search-page/admin-search-results/admin-search-result-grid-element/item-search-result/item-admin-search-result-grid-element.component';
import { CollectionAdminSearchResultListElementComponent } from '../../admin/admin-search-page/admin-search-results/admin-search-result-list-element/collection-search-result/collection-admin-search-result-list-element.component';
import { CommunityAdminSearchResultListElementComponent } from '../../admin/admin-search-page/admin-search-results/admin-search-result-list-element/community-search-result/community-admin-search-result-list-element.component';
import { ItemAdminSearchResultListElementComponent } from '../../admin/admin-search-page/admin-search-results/admin-search-result-list-element/item-search-result/item-admin-search-result-list-element.component';
import { ItemAdminSearchResultActionsComponent } from '../../admin/admin-search-page/admin-search-results/item-admin-search-result-actions.component';
import { WorkflowItemAdminWorkflowActionsComponent } from '../../admin/admin-workflow-page/admin-workflow-search-results/actions/workflow-item/workflow-item-admin-workflow-actions.component';
import { WorkspaceItemAdminWorkflowActionsComponent } from '../../admin/admin-workflow-page/admin-workflow-search-results/actions/workspace-item/workspace-item-admin-workflow-actions.component';
import { WorkflowItemSearchResultAdminWorkflowGridElementComponent } from '../../admin/admin-workflow-page/admin-workflow-search-results/admin-workflow-search-result-grid-element/workflow-item/workflow-item-search-result-admin-workflow-grid-element.component';
import { WorkspaceItemSearchResultAdminWorkflowGridElementComponent } from '../../admin/admin-workflow-page/admin-workflow-search-results/admin-workflow-search-result-grid-element/workspace-item/workspace-item-search-result-admin-workflow-grid-element.component';
import { WorkflowItemSearchResultAdminWorkflowListElementComponent } from '../../admin/admin-workflow-page/admin-workflow-search-results/admin-workflow-search-result-list-element/workflow-item/workflow-item-search-result-admin-workflow-list-element.component';
import { WorkspaceItemSearchResultAdminWorkflowListElementComponent } from '../../admin/admin-workflow-page/admin-workflow-search-results/admin-workflow-search-result-list-element/workspace-item/workspace-item-search-result-admin-workflow-list-element.component';
import { JournalGridElementComponent } from '../../entity-groups/journal-entities/item-grid-elements/journal/journal-grid-element.component';
import { JournalIssueGridElementComponent } from '../../entity-groups/journal-entities/item-grid-elements/journal-issue/journal-issue-grid-element.component';
import { JournalVolumeGridElementComponent } from '../../entity-groups/journal-entities/item-grid-elements/journal-volume/journal-volume-grid-element.component';
import { JournalSearchResultGridElementComponent } from '../../entity-groups/journal-entities/item-grid-elements/search-result-grid-elements/journal/journal-search-result-grid-element.component';
import { JournalIssueSearchResultGridElementComponent } from '../../entity-groups/journal-entities/item-grid-elements/search-result-grid-elements/journal-issue/journal-issue-search-result-grid-element.component';
import { JournalVolumeSearchResultGridElementComponent } from '../../entity-groups/journal-entities/item-grid-elements/search-result-grid-elements/journal-volume/journal-volume-search-result-grid-element.component';
import { JournalListElementComponent } from '../../entity-groups/journal-entities/item-list-elements/journal/journal-list-element.component';
import { JournalIssueListElementComponent } from '../../entity-groups/journal-entities/item-list-elements/journal-issue/journal-issue-list-element.component';
import { JournalVolumeListElementComponent } from '../../entity-groups/journal-entities/item-list-elements/journal-volume/journal-volume-list-element.component';
import { JournalSearchResultListElementComponent } from '../../entity-groups/journal-entities/item-list-elements/search-result-list-elements/journal/journal-search-result-list-element.component';
import { JournalIssueSearchResultListElementComponent } from '../../entity-groups/journal-entities/item-list-elements/search-result-list-elements/journal-issue/journal-issue-search-result-list-element.component';
import { JournalVolumeSearchResultListElementComponent } from '../../entity-groups/journal-entities/item-list-elements/search-result-list-elements/journal-volume/journal-volume-search-result-list-element.component';
import { JournalSidebarSearchListElementComponent } from '../../entity-groups/journal-entities/item-list-elements/sidebar-search-list-elements/journal/journal-sidebar-search-list-element.component';
import { JournalIssueSidebarSearchListElementComponent } from '../../entity-groups/journal-entities/item-list-elements/sidebar-search-list-elements/journal-issue/journal-issue-sidebar-search-list-element.component';
import { JournalVolumeSidebarSearchListElementComponent } from '../../entity-groups/journal-entities/item-list-elements/sidebar-search-list-elements/journal-volume/journal-volume-sidebar-search-list-element.component';
import { JournalComponent } from '../../entity-groups/journal-entities/item-pages/journal/journal.component';
import { JournalIssueComponent } from '../../entity-groups/journal-entities/item-pages/journal-issue/journal-issue.component';
import { JournalVolumeComponent } from '../../entity-groups/journal-entities/item-pages/journal-volume/journal-volume.component';
import { OrgUnitGridElementComponent } from '../../entity-groups/research-entities/item-grid-elements/org-unit/org-unit-grid-element.component';
import { PersonGridElementComponent } from '../../entity-groups/research-entities/item-grid-elements/person/person-grid-element.component';
import { ProjectGridElementComponent } from '../../entity-groups/research-entities/item-grid-elements/project/project-grid-element.component';
import { OrgUnitSearchResultGridElementComponent } from '../../entity-groups/research-entities/item-grid-elements/search-result-grid-elements/org-unit/org-unit-search-result-grid-element.component';
import { PersonSearchResultGridElementComponent } from '../../entity-groups/research-entities/item-grid-elements/search-result-grid-elements/person/person-search-result-grid-element.component';
import { ProjectSearchResultGridElementComponent } from '../../entity-groups/research-entities/item-grid-elements/search-result-grid-elements/project/project-search-result-grid-element.component';
import { OrgUnitListElementComponent } from '../../entity-groups/research-entities/item-list-elements/org-unit/org-unit-list-element.component';
import { PersonListElementComponent } from '../../entity-groups/research-entities/item-list-elements/person/person-list-element.component';
import { ProjectListElementComponent } from '../../entity-groups/research-entities/item-list-elements/project/project-list-element.component';
import { OrgUnitSearchResultListElementComponent } from '../../entity-groups/research-entities/item-list-elements/search-result-list-elements/org-unit/org-unit-search-result-list-element.component';
import { PersonSearchResultListElementComponent } from '../../entity-groups/research-entities/item-list-elements/search-result-list-elements/person/person-search-result-list-element.component';
import { ProjectSearchResultListElementComponent } from '../../entity-groups/research-entities/item-list-elements/search-result-list-elements/project/project-search-result-list-element.component';
import { OrgUnitSidebarSearchListElementComponent } from '../../entity-groups/research-entities/item-list-elements/sidebar-search-list-elements/org-unit/org-unit-sidebar-search-list-element.component';
import { PersonSidebarSearchListElementComponent } from '../../entity-groups/research-entities/item-list-elements/sidebar-search-list-elements/person/person-sidebar-search-list-element.component';
import { ProjectSidebarSearchListElementComponent } from '../../entity-groups/research-entities/item-list-elements/sidebar-search-list-elements/project/project-sidebar-search-list-element.component';
import { OrgUnitComponent } from '../../entity-groups/research-entities/item-pages/org-unit/org-unit.component';
import { PersonComponent } from '../../entity-groups/research-entities/item-pages/person/person.component';
import { ProjectComponent } from '../../entity-groups/research-entities/item-pages/project/project.component';
import { ExternalSourceEntryListSubmissionElementComponent } from '../../entity-groups/research-entities/submission/item-list-elements/external-source-entry/external-source-entry-list-submission-element.component';
import { OrgUnitSearchResultListSubmissionElementComponent } from '../../entity-groups/research-entities/submission/item-list-elements/org-unit/org-unit-search-result-list-submission-element.component';
import { OrgUnitInputSuggestionsComponent } from '../../entity-groups/research-entities/submission/item-list-elements/org-unit/org-unit-suggestions/org-unit-input-suggestions.component';
import { PersonSearchResultListSubmissionElementComponent } from '../../entity-groups/research-entities/submission/item-list-elements/person/person-search-result-list-submission-element.component';
import { PersonInputSuggestionsComponent } from '../../entity-groups/research-entities/submission/item-list-elements/person/person-suggestions/person-input-suggestions.component';
import { CollectionsComponent } from '../../item-page/field-components/collections/collections.component';
import { ThemedMediaViewerComponent } from '../../item-page/media-viewer/themed-media-viewer.component';
import { MiradorViewerComponent } from '../../item-page/mirador-viewer/mirador-viewer.component';
import { ThemedFileSectionComponent } from '../../item-page/simple/field-components/file-section/themed-file-section.component';
import { ItemPageAbstractFieldComponent } from '../../item-page/simple/field-components/specific-field/abstract/item-page-abstract-field.component';
import { ItemPageDateFieldComponent } from '../../item-page/simple/field-components/specific-field/date/item-page-date-field.component';
import { GenericItemPageFieldComponent } from '../../item-page/simple/field-components/specific-field/generic/generic-item-page-field.component';
import { ThemedItemPageTitleFieldComponent } from '../../item-page/simple/field-components/specific-field/title/themed-item-page-field.component';
import { ItemPageUriFieldComponent } from '../../item-page/simple/field-components/specific-field/uri/item-page-uri-field.component';
import { PublicationComponent } from '../../item-page/simple/item-types/publication/publication.component';
import { UntypedItemComponent } from '../../item-page/simple/item-types/untyped-item/untyped-item.component';
import { ThemedMetadataRepresentationListComponent } from '../../item-page/simple/metadata-representation-list/themed-metadata-representation-list.component';
import { TabbedRelatedEntitiesSearchComponent } from '../../item-page/simple/related-entities/tabbed-related-entities-search/tabbed-related-entities-search.component';
import { RelatedItemsComponent } from '../../item-page/simple/related-items/related-items-component';
import { DsoEditMenuComponent } from '../../shared/dso-page/dso-edit-menu/dso-edit-menu.component';
import { ThemedLoadingComponent } from '../../shared/loading/themed-loading.component';
import { MetadataFieldWrapperComponent } from '../../shared/metadata-field-wrapper/metadata-field-wrapper.component';
import { ClaimedTaskActionsComponent } from '../../shared/mydspace-actions/claimed-task/claimed-task-actions.component';
import { ItemActionsComponent } from '../../shared/mydspace-actions/item/item-actions.component';
import { PoolTaskActionsComponent } from '../../shared/mydspace-actions/pool-task/pool-task-actions.component';
import { WorkflowitemActionsComponent } from '../../shared/mydspace-actions/workflowitem/workflowitem-actions.component';
import { WorkspaceitemActionsComponent } from '../../shared/mydspace-actions/workspaceitem/workspaceitem-actions.component';
import { BadgesComponent } from '../../shared/object-collection/shared/badges/badges.component';
import { ThemedBadgesComponent } from '../../shared/object-collection/shared/badges/themed-badges.component';
import { ListableObjectComponentLoaderComponent } from '../../shared/object-collection/shared/listable-object/listable-object-component-loader.component';
import { ClaimedTaskSearchResultDetailElementComponent } from '../../shared/object-detail/my-dspace-result-detail-element/claimed-task-search-result/claimed-task-search-result-detail-element.component';
import { ItemDetailPreviewComponent } from '../../shared/object-detail/my-dspace-result-detail-element/item-detail-preview/item-detail-preview.component';
import { ItemSearchResultDetailElementComponent } from '../../shared/object-detail/my-dspace-result-detail-element/item-search-result/item-search-result-detail-element.component';
import { PoolSearchResultDetailElementComponent } from '../../shared/object-detail/my-dspace-result-detail-element/pool-search-result/pool-search-result-detail-element.component';
import { WorkflowItemSearchResultDetailElementComponent } from '../../shared/object-detail/my-dspace-result-detail-element/workflow-item-search-result/workflow-item-search-result-detail-element.component';
import { WorkspaceItemSearchResultDetailElementComponent } from '../../shared/object-detail/my-dspace-result-detail-element/workspace-item-search-result/workspace-item-search-result-detail-element.component';
import { CollectionGridElementComponent } from '../../shared/object-grid/collection-grid-element/collection-grid-element.component';
import { CommunityGridElementComponent } from '../../shared/object-grid/community-grid-element/community-grid-element.component';
import { ItemGridElementComponent } from '../../shared/object-grid/item-grid-element/item-types/item/item-grid-element.component';
import { CollectionSearchResultGridElementComponent } from '../../shared/object-grid/search-result-grid-element/collection-search-result/collection-search-result-grid-element.component';
import { CommunitySearchResultGridElementComponent } from '../../shared/object-grid/search-result-grid-element/community-search-result/community-search-result-grid-element.component';
import { ItemSearchResultGridElementComponent } from '../../shared/object-grid/search-result-grid-element/item-search-result/item/item-search-result-grid-element.component';
import { BitstreamListItemComponent } from '../../shared/object-list/bitstream-list-item/bitstream-list-item.component';
import { BrowseEntryListElementComponent } from '../../shared/object-list/browse-entry-list-element/browse-entry-list-element.component';
import { BundleListElementComponent } from '../../shared/object-list/bundle-list-element/bundle-list-element.component';
import { CollectionListElementComponent } from '../../shared/object-list/collection-list-element/collection-list-element.component';
import { CommunityListElementComponent } from '../../shared/object-list/community-list-element/community-list-element.component';
import { ItemListElementComponent } from '../../shared/object-list/item-list-element/item-types/item/item-list-element.component';
import { ListableNotificationObjectComponent } from '../../shared/object-list/listable-notification-object/listable-notification-object.component';
import { ClaimedApprovedSearchResultListElementComponent } from '../../shared/object-list/my-dspace-result-list-element/claimed-search-result/claimed-approved-search-result/claimed-approved-search-result-list-element.component';
import { ClaimedDeclinedSearchResultListElementComponent } from '../../shared/object-list/my-dspace-result-list-element/claimed-search-result/claimed-declined-search-result/claimed-declined-search-result-list-element.component';
import { ClaimedDeclinedTaskSearchResultListElementComponent } from '../../shared/object-list/my-dspace-result-list-element/claimed-search-result/claimed-declined-task-search-result/claimed-declined-task-search-result-list-element.component';
import { ClaimedSearchResultListElementComponent } from '../../shared/object-list/my-dspace-result-list-element/claimed-search-result/claimed-search-result-list-element.component';
import { ThemedItemListPreviewComponent } from '../../shared/object-list/my-dspace-result-list-element/item-list-preview/themed-item-list-preview.component';
import { ItemSearchResultListElementSubmissionComponent } from '../../shared/object-list/my-dspace-result-list-element/item-search-result/item-search-result-list-element-submission.component';
import { PoolSearchResultListElementComponent } from '../../shared/object-list/my-dspace-result-list-element/pool-search-result/pool-search-result-list-element.component';
import { WorkflowItemSearchResultListElementComponent } from '../../shared/object-list/my-dspace-result-list-element/workflow-item-search-result/workflow-item-search-result-list-element.component';
import { WorkspaceItemSearchResultListElementComponent } from '../../shared/object-list/my-dspace-result-list-element/workspace-item-search-result/workspace-item-search-result-list-element.component';
import { CollectionSearchResultListElementComponent } from '../../shared/object-list/search-result-list-element/collection-search-result/collection-search-result-list-element.component';
import { CommunitySearchResultListElementComponent } from '../../shared/object-list/search-result-list-element/community-search-result/community-search-result-list-element.component';
import { ItemSearchResultListElementComponent } from '../../shared/object-list/search-result-list-element/item-search-result/item-types/item/item-search-result-list-element.component';
import { CollectionSidebarSearchListElementComponent } from '../../shared/object-list/sidebar-search-list-element/collection/collection-sidebar-search-list-element.component';
import { CommunitySidebarSearchListElementComponent } from '../../shared/object-list/sidebar-search-list-element/community/community-sidebar-search-list-element.component';
import { PublicationSidebarSearchListElementComponent } from '../../shared/object-list/sidebar-search-list-element/item-types/publication/publication-sidebar-search-list-element.component';
import { ThemedResultsBackButtonComponent } from '../../shared/results-back-button/themed-results-back-button.component';
import { TruncatableComponent } from '../../shared/truncatable/truncatable.component';
import { TruncatablePartComponent } from '../../shared/truncatable/truncatable-part/truncatable-part.component';
import { ThemedThumbnailComponent } from '../../thumbnail/themed-thumbnail.component';
import { ThumbnailComponent } from '../../thumbnail/thumbnail.component';
import { EraComponent } from 'src/app/entity-groups/research-entities/item-pages/era/era.component';
import { EventComponent } from 'src/app/entity-groups/research-entities/item-pages/event/event.component';
import { PlaceComponent } from 'src/app/entity-groups/research-entities/item-pages/place/place.component';
import { SeriesComponent } from 'src/app/entity-groups/research-entities/item-pages/series/series.component';
import { SubjectComponent } from 'src/app/entity-groups/research-entities/item-pages/subject/subject.component';
import { JournalIssueItemMetadataListElementComponent } from 'src/app/entity-groups/journal-entities/metadata-representations/journal-issue/journal-issue-item-metadata-list-element.component';
import { JournalVolumeItemMetadataListElementComponent } from 'src/app/entity-groups/journal-entities/metadata-representations/journal-volume/journal-volume-item-metadata-list-element.component';
import { JournalItemMetadataListElementComponent } from 'src/app/entity-groups/journal-entities/metadata-representations/journal/journal-item-metadata-list-element.component';
import { EraItemMetadataListElementComponent } from 'src/app/entity-groups/research-entities/metadata-representations/era/era-item-metadata-list-element.component';
import { EventItemMetadataListElementComponent } from 'src/app/entity-groups/research-entities/metadata-representations/event/event-item-metadata-list-element.component';
import { PlaceItemMetadataListElementComponent } from 'src/app/entity-groups/research-entities/metadata-representations/place/place-item-metadata-list-element.component';
import { SeriesItemMetadataListElementComponent } from 'src/app/entity-groups/research-entities/metadata-representations/series/series-item-metadata-list-element.component';
import { SubjectItemMetadataListElementComponent } from 'src/app/entity-groups/research-entities/metadata-representations/subject/subject-item-metadata-list-element.component';
import { EraGridElementComponent } from 'src/app/entity-groups/research-entities/item-grid-elements/era/era-grid-element.component';
import { EventGridElementComponent } from 'src/app/entity-groups/research-entities/item-grid-elements/event/event-grid-element.component';
import { PlaceGridElementComponent } from 'src/app/entity-groups/research-entities/item-grid-elements/place/place-grid-element.component';
import { EraSearchResultGridElementComponent } from 'src/app/entity-groups/research-entities/item-grid-elements/search-result-grid-elements/era/era-search-result-grid-element.component';
import { EventSearchResultGridElementComponent } from 'src/app/entity-groups/research-entities/item-grid-elements/search-result-grid-elements/event/event-search-result-grid-element.component';
import { PlaceSearchResultGridElementComponent } from 'src/app/entity-groups/research-entities/item-grid-elements/search-result-grid-elements/place/place-search-result-grid-element.component';
import { SeriesSearchResultGridElementComponent } from 'src/app/entity-groups/research-entities/item-grid-elements/search-result-grid-elements/series/series-search-result-grid-element.component';
import { SubjectSearchResultGridElementComponent } from 'src/app/entity-groups/research-entities/item-grid-elements/search-result-grid-elements/subject/subject-search-result-grid-element.component';
import { SeriesGridElementComponent } from 'src/app/entity-groups/research-entities/item-grid-elements/series/series-grid-element.component';
import { SubjectGridElementComponent } from 'src/app/entity-groups/research-entities/item-grid-elements/subject/subject-grid-element.component';
import { EraListElementComponent } from 'src/app/entity-groups/research-entities/item-list-elements/era/era-list-element.component';
import { EventListElementComponent } from 'src/app/entity-groups/research-entities/item-list-elements/event/event-list-element.component';
import { PlaceListElementComponent } from 'src/app/entity-groups/research-entities/item-list-elements/place/place-list-element.component';
import { EraSearchResultListElementComponent } from 'src/app/entity-groups/research-entities/item-list-elements/search-result-list-elements/era/era-search-result-list-element.component';
import { EventSearchResultListElementComponent } from 'src/app/entity-groups/research-entities/item-list-elements/search-result-list-elements/event/event-search-result-list-element.component';
import { PlaceSearchResultListElementComponent } from 'src/app/entity-groups/research-entities/item-list-elements/search-result-list-elements/place/place-search-result-list-element.component';
import { SeriesSearchResultListElementComponent } from 'src/app/entity-groups/research-entities/item-list-elements/search-result-list-elements/series/series-search-result-list-element.component';
import { SubjectSearchResultListElementComponent } from 'src/app/entity-groups/research-entities/item-list-elements/search-result-list-elements/subject/subject-search-result-list-element.component';
import { SeriesListElementComponent } from 'src/app/entity-groups/research-entities/item-list-elements/series/series-list-element.component';
import { EraSidebarSearchListElementComponent } from 'src/app/entity-groups/research-entities/item-list-elements/sidebar-search-list-elements/era/era-sidebar-search-list-element.component';
import { EventSidebarSearchListElementComponent } from 'src/app/entity-groups/research-entities/item-list-elements/sidebar-search-list-elements/event/event-sidebar-search-list-element.component';
import { PlaceSidebarSearchListElementComponent } from 'src/app/entity-groups/research-entities/item-list-elements/sidebar-search-list-elements/place/place-sidebar-search-list-element.component';
import { SeriesSidebarSearchListElementComponent } from 'src/app/entity-groups/research-entities/item-list-elements/sidebar-search-list-elements/series/series-sidebar-search-list-element.component';
import { SubjectSidebarSearchListElementComponent } from 'src/app/entity-groups/research-entities/item-list-elements/sidebar-search-list-elements/subject/subject-sidebar-search-list-element.component';
import { SubjectListElementComponent } from 'src/app/entity-groups/research-entities/item-list-elements/subject/subject-list-element.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { PdfJsViewerModule } from 'ng2-pdfjs-viewer';

const ENTRY_COMPONENTS = [
  EraComponent,
  EventComponent,
  PlaceComponent,
  SeriesComponent,
  SubjectComponent,
  
  SeriesItemMetadataListElementComponent,
  PlaceItemMetadataListElementComponent,
  EventItemMetadataListElementComponent,
  EraItemMetadataListElementComponent,
  JournalVolumeItemMetadataListElementComponent,
  JournalIssueItemMetadataListElementComponent,
  JournalItemMetadataListElementComponent,
  SubjectItemMetadataListElementComponent,

  EraSearchResultGridElementComponent,
  EventSearchResultGridElementComponent,
  PlaceSearchResultGridElementComponent,
  SeriesSearchResultGridElementComponent,
  SubjectSearchResultGridElementComponent,

  SubjectGridElementComponent,
  SeriesGridElementComponent,
  PlaceGridElementComponent,
  EventGridElementComponent,
  EraGridElementComponent,


  SeriesSidebarSearchListElementComponent,
  PlaceSidebarSearchListElementComponent,
  EventSidebarSearchListElementComponent,
  EraSidebarSearchListElementComponent,
  SubjectSidebarSearchListElementComponent,

  EraSearchResultListElementComponent,
  EventSearchResultListElementComponent,
  PlaceSearchResultListElementComponent,
  SeriesSearchResultListElementComponent,
  SubjectSearchResultListElementComponent,

  SeriesListElementComponent,
  PlaceListElementComponent,
  EventListElementComponent,
  EraListElementComponent,
  SubjectListElementComponent,


  BitstreamListItemComponent,
  BrowseEntryListElementComponent,
  BundleListElementComponent,
  CollectionAdminSearchResultGridElementComponent,
  CollectionAdminSearchResultListElementComponent,
  CollectionGridElementComponent,
  CollectionListElementComponent,
  CollectionSearchResultGridElementComponent,
  CollectionSearchResultListElementComponent,
  CollectionSidebarSearchListElementComponent,
  CommunityAdminSearchResultGridElementComponent,
  CommunityAdminSearchResultListElementComponent,
  CommunityGridElementComponent,
  CommunityListElementComponent,
  CommunitySearchResultGridElementComponent,
  CommunitySearchResultListElementComponent,
  CommunitySidebarSearchListElementComponent,
  ExternalSourceEntryListSubmissionElementComponent,
  ItemAdminSearchResultGridElementComponent,
  ItemAdminSearchResultListElementComponent,
  ItemGridElementComponent,
  ItemListElementComponent,
  ItemSearchResultGridElementComponent,
  ItemSearchResultListElementComponent,
  JournalComponent,
  JournalGridElementComponent,
  JournalIssueComponent,
  JournalIssueGridElementComponent,
  JournalIssueListElementComponent,
  JournalIssueSearchResultGridElementComponent,
  JournalIssueSearchResultListElementComponent,
  JournalIssueSidebarSearchListElementComponent,
  JournalListElementComponent,
  JournalSearchResultGridElementComponent,
  JournalSearchResultListElementComponent,
  JournalSidebarSearchListElementComponent,
  JournalVolumeComponent,
  JournalVolumeGridElementComponent,
  JournalVolumeListElementComponent,
  JournalVolumeSearchResultGridElementComponent,
  JournalVolumeSearchResultListElementComponent,
  JournalVolumeSidebarSearchListElementComponent,
  ListableNotificationObjectComponent,
  OrgUnitComponent,
  OrgUnitGridElementComponent,
  OrgUnitListElementComponent,
  OrgUnitSearchResultGridElementComponent,
  OrgUnitSearchResultListElementComponent,
  OrgUnitSearchResultListSubmissionElementComponent,
  OrgUnitSidebarSearchListElementComponent,
  PersonComponent,
  PersonGridElementComponent,
  PersonListElementComponent,
  PersonSearchResultGridElementComponent,
  PersonSearchResultListElementComponent,
  PersonSearchResultListSubmissionElementComponent,
  PersonSidebarSearchListElementComponent,
  ProjectComponent,
  ProjectGridElementComponent,
  ProjectListElementComponent,
  ProjectSearchResultGridElementComponent,
  ProjectSearchResultListElementComponent,
  ProjectSidebarSearchListElementComponent,
  PublicationSidebarSearchListElementComponent,
  WorkflowItemSearchResultAdminWorkflowListElementComponent,
  WorkflowItemSearchResultAdminWorkflowGridElementComponent,
  WorkspaceItemSearchResultAdminWorkflowListElementComponent,
  WorkspaceItemSearchResultAdminWorkflowGridElementComponent,
  WorkspaceItemSearchResultListElementComponent,
  WorkflowItemSearchResultListElementComponent,
  ClaimedSearchResultListElementComponent,
  ClaimedApprovedSearchResultListElementComponent,
  ClaimedDeclinedSearchResultListElementComponent,
  ClaimedDeclinedTaskSearchResultListElementComponent,
  PoolSearchResultListElementComponent,
  ItemSearchResultDetailElementComponent,
  WorkspaceItemSearchResultDetailElementComponent,
  WorkflowItemSearchResultDetailElementComponent,
  ClaimedTaskSearchResultDetailElementComponent,
  PoolSearchResultDetailElementComponent,
  ItemSearchResultListElementSubmissionComponent,
  PublicationComponent,
  UntypedItemComponent,
];

@NgModule({
  exports: [...ENTRY_COMPONENTS],
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule,

    PdfJsViewerModule,
    ScrollingModule,

    ThemedLoadingComponent,
    TruncatableComponent,
    TruncatablePartComponent,
    ThumbnailComponent,
    BadgesComponent,
    ThemedBadgesComponent,
    ItemDetailPreviewComponent,
    GenericItemPageFieldComponent,
    RelatedItemsComponent,
    WorkspaceitemActionsComponent,
    ListableObjectComponentLoaderComponent,
    PoolTaskActionsComponent,
    ThemedItemListPreviewComponent,
    OrgUnitInputSuggestionsComponent,
    ThemedMetadataRepresentationListComponent,
    ClaimedTaskActionsComponent,
    WorkflowitemActionsComponent,
    ItemAdminSearchResultActionsComponent,
    MetadataFieldWrapperComponent,
    ThemedThumbnailComponent,
    ThemedItemPageTitleFieldComponent,
    ThemedResultsBackButtonComponent,
    DsoEditMenuComponent,
    ItemActionsComponent,
    PersonInputSuggestionsComponent,
    TabbedRelatedEntitiesSearchComponent,
    WorkspaceItemAdminWorkflowActionsComponent,
    WorkflowItemAdminWorkflowActionsComponent,
    FormsModule,
    MiradorViewerComponent,
    ThemedMediaViewerComponent,
    ThemedFileSectionComponent,
    ItemPageDateFieldComponent,
    ItemPageAbstractFieldComponent,
    ItemPageUriFieldComponent,
    CollectionsComponent,
    ...ENTRY_COMPONENTS,
  ],
})
export class ListableModule {
  /**
   * NOTE: this method allows to resolve issue with components that using a custom decorator
   * which are not loaded during SSR otherwise
   */
  static withEntryComponents() {
    return {
      ngModule: ListableModule,
      providers: ENTRY_COMPONENTS.map((component) => ({ provide: component })),
    };
  }
}
