import {
  AsyncPipe,
  NgClass,
} from '@angular/common';
import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import { Context } from '../../../../../core/shared/context.model';
import { Item } from '../../../../../core/shared/item.model';
import { ViewMode } from '../../../../../core/shared/view-mode.model';
import { ItemSearchResult } from '../../../../../shared/object-collection/shared/item-search-result.model';
import { listableObjectComponent } from '../../../../../shared/object-collection/shared/listable-object/listable-object.decorator';
import { SidebarSearchListElementComponent } from '../../../../../shared/object-list/sidebar-search-list-element/sidebar-search-list-element.component';
import { TruncatablePartComponent } from '../../../../../shared/truncatable/truncatable-part/truncatable-part.component';
import { KwareTranslatePipe } from 'src/app/shared/utils/kware-translate.pipe';

@listableObjectComponent('ProjectSearchResult', ViewMode.ListElement, Context.SideBarSearchModal)
@listableObjectComponent('ProjectSearchResult', ViewMode.ListElement, Context.SideBarSearchModalCurrent)
@listableObjectComponent('ProjectSearchResult', ViewMode.ListElement, Context.ScopeSelectorModal)
@listableObjectComponent('ProjectSearchResult', ViewMode.ListElement, Context.ScopeSelectorModalCurrent)
@Component({
  selector: 'ds-project-sidebar-search-list-element',
  templateUrl: '../../../../../shared/object-list/sidebar-search-list-element/sidebar-search-list-element.component.html',
  standalone: true,
  imports: [
    AsyncPipe,
    NgClass,
    TranslateModule,
    TruncatablePartComponent,
    KwareTranslatePipe
  ],
})
/**
 * Component displaying a list element for a {@link ItemSearchResult} of type "Project" within the context of
 * a sidebar search modal
 */
export class ProjectSidebarSearchListElementComponent extends SidebarSearchListElementComponent<ItemSearchResult, Item> {
  /**
   * Projects currently don't support a description
   */
  getDescription(): string {
    return undefined;
  }
}
