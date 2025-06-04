import { Component } from '@angular/core';
import { ViewMode } from '../../../../core/shared/view-mode.model';
import { listableObjectComponent } from '../../../../shared/object-collection/shared/listable-object/listable-object.decorator';
import { AbstractListableElementComponent } from '../../../../shared/object-collection/shared/object-collection-element/abstract-listable-element.component';
import { Item } from '../../../../core/shared/item.model';
import { SubjectSearchResultGridElementComponent } from '../search-result-grid-elements/subject/subject-search-result-grid-element.component';

@listableObjectComponent('Subject', ViewMode.GridElement)
@Component({
  selector: 'ds-subject-grid-element',
  styleUrls: ['./subject-grid-element.component.scss'],
  templateUrl: './subject-grid-element.component.html',
  standalone: true,
  imports: [SubjectSearchResultGridElementComponent],
})
/**
 * The component for displaying a grid element for an item of the type Organisation Unit
 */
export class SubjectGridElementComponent extends AbstractListableElementComponent<Item> {
}
