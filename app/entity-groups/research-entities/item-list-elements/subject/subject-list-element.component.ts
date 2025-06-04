import { Component } from '@angular/core';
import { ViewMode } from '../../../../core/shared/view-mode.model';
import { listableObjectComponent } from '../../../../shared/object-collection/shared/listable-object/listable-object.decorator';
import { AbstractListableElementComponent } from '../../../../shared/object-collection/shared/object-collection-element/abstract-listable-element.component';
import { Item } from '../../../../core/shared/item.model';
import { SubjectSearchResultListElementComponent } from '../search-result-list-elements/subject/subject-search-result-list-element.component';

@listableObjectComponent('Subject', ViewMode.ListElement)
@Component({
  selector: 'ds-subject-list-element',
  styleUrls: ['./subject-list-element.component.scss'],
  templateUrl: './subject-list-element.component.html',
  standalone: true,
  imports: [SubjectSearchResultListElementComponent],
})
/**
 * The component for displaying a list element for an item of the type Organisation Unit
 */
export class SubjectListElementComponent extends AbstractListableElementComponent<Item> {
}
