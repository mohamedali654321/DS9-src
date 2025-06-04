import { Component } from '@angular/core';
import { ViewMode } from '../../../../core/shared/view-mode.model';
import { listableObjectComponent } from '../../../../shared/object-collection/shared/listable-object/listable-object.decorator';
import { AbstractListableElementComponent } from '../../../../shared/object-collection/shared/object-collection-element/abstract-listable-element.component';
import { Item } from '../../../../core/shared/item.model';
import { EraSearchResultGridElementComponent } from '../search-result-grid-elements/era/era-search-result-grid-element.component';

@listableObjectComponent('Era', ViewMode.GridElement)
@Component({
  selector: 'ds-era-grid-element',
  styleUrls: ['./era-grid-element.component.scss'],
  templateUrl: './era-grid-element.component.html',
  standalone: true,
  imports: [EraSearchResultGridElementComponent],
})
/**
 * The component for displaying a grid element for an item of the type Organisation Unit
 */
export class EraGridElementComponent extends AbstractListableElementComponent<Item> {
}
