import { Component } from '@angular/core';
import { ViewMode } from '../../../../core/shared/view-mode.model';
import { listableObjectComponent } from '../../../../shared/object-collection/shared/listable-object/listable-object.decorator';
import { AbstractListableElementComponent } from '../../../../shared/object-collection/shared/object-collection-element/abstract-listable-element.component';
import { Item } from '../../../../core/shared/item.model';
import { PlaceSearchResultListElementComponent } from '../search-result-list-elements/place/place-search-result-list-element.component';

@listableObjectComponent('Place', ViewMode.ListElement)
@Component({
  selector: 'ds-place-list-element',
  styleUrls: ['./place-list-element.component.scss'],
  templateUrl: './place-list-element.component.html',
  standalone: true,
  imports: [PlaceSearchResultListElementComponent],
})
/**
 * The component for displaying a list element for an item of the type Organisation Unit
 */
export class PlaceListElementComponent extends AbstractListableElementComponent<Item> {
}
