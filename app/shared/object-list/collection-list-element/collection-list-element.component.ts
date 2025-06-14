
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Collection } from '../../../core/shared/collection.model';
import { ViewMode } from '../../../core/shared/view-mode.model';
import { listableObjectComponent } from '../../object-collection/shared/listable-object/listable-object.decorator';
import { AbstractListableElementComponent } from '../../object-collection/shared/object-collection-element/abstract-listable-element.component';
import { KwareTranslatePipe } from "../../utils/kware-translate.pipe";

@Component({
  selector: 'ds-collection-list-element',
  styleUrls: ['./collection-list-element.component.scss'],
  templateUrl: './collection-list-element.component.html',
  standalone: true,
  imports: [
    RouterLink,
    KwareTranslatePipe
],
})
/**
 * Component representing list element for a collection
 */
@listableObjectComponent(Collection, ViewMode.ListElement)
export class CollectionListElementComponent extends AbstractListableElementComponent<Collection> {}
