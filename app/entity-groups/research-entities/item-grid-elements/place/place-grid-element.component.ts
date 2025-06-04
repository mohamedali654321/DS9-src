import { Component } from '@angular/core';
import { ViewMode } from '../../../../core/shared/view-mode.model';
import { listableObjectComponent } from '../../../../shared/object-collection/shared/listable-object/listable-object.decorator';
import { AbstractListableElementComponent } from '../../../../shared/object-collection/shared/object-collection-element/abstract-listable-element.component';
import { Item } from '../../../../core/shared/item.model';
import { PlaceSearchResultGridElementComponent } from '../search-result-grid-elements/place/place-search-result-grid-element.component';

@listableObjectComponent('Place', ViewMode.GridElement)
@Component({
  selector: 'ds-place-grid-element',
  styleUrls: ['./place-grid-element.component.scss'],
  templateUrl: './place-grid-element.component.html',
  standalone: true,
  imports: [PlaceSearchResultGridElementComponent],
})
/**
 * The component for displaying a grid element for an item of the type Organisation Unit
 */
export class PlaceGridElementComponent extends AbstractListableElementComponent<Item> {
}
