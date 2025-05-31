import { Component } from '@angular/core';
import { metadataRepresentationComponent } from '../../../../shared/metadata-representation/metadata-representation.decorator';
import { MetadataRepresentationType } from '../../../../core/shared/metadata-representation/metadata-representation.model';
import { ItemMetadataRepresentationListElementComponent } from '../../../../shared/object-list/metadata-representation-list-element/item/item-metadata-representation-list-element.component';
import { LocaleService } from 'src/app/core/locale/locale.service';
import { NgIf, NgFor, NgClass, NgStyle } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { TruncatableComponent } from 'src/app/shared/truncatable/truncatable.component';
import { KwareTranslatePipe } from 'src/app/shared/utils/kware-translate.pipe';
import { DSONameService } from 'src/app/core/breadcrumbs/dso-name.service';

// @metadataRepresentationComponent('Place', MetadataRepresentationType.Item)
@Component({
  selector: 'ds-place-item-metadata-list-element',
  templateUrl: './place-item-metadata-list-element.component.html',
  standalone: true,
  imports: [NgIf, NgFor, TruncatableComponent, RouterLink, NgbTooltipModule,NgClass,KwareTranslatePipe,NgStyle,TranslateModule],
})
/**
 * The component for displaying an item of the type OrgUnit as a metadata field
 */
export class PlaceItemMetadataListElementComponent extends ItemMetadataRepresentationListElementComponent {
  constructor(public localeService: LocaleService, public dsoNameService: DSONameService,  /* kware edit - call service from LocaleService */){super();}
}
