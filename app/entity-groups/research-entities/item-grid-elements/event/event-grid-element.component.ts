import { Component } from '@angular/core';
import { ViewMode } from '../../../../core/shared/view-mode.model';
import { listableObjectComponent } from '../../../../shared/object-collection/shared/listable-object/listable-object.decorator';
import { AbstractListableElementComponent } from '../../../../shared/object-collection/shared/object-collection-element/abstract-listable-element.component';
import { Item } from '../../../../core/shared/item.model';
import { EventSearchResultGridElementComponent } from '../search-result-grid-elements/event/event-search-result-grid-element.component';

@listableObjectComponent('Event', ViewMode.GridElement)
@Component({
  selector: 'ds-event-grid-element',
  styleUrls: ['./event-grid-element.component.scss'],
  templateUrl: './event-grid-element.component.html',
  standalone: true,
  imports: [EventSearchResultGridElementComponent],
})
/**
 * The component for displaying a grid element for an item of the type Organisation Unit
 */
export class EventGridElementComponent extends AbstractListableElementComponent<Item> {
}
