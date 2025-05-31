import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

import { ItemMetadataRepresentationListElementComponent } from '../../../../shared/object-list/metadata-representation-list-element/item/item-metadata-representation-list-element.component';
import { OrcidBadgeAndTooltipComponent } from '../../../../shared/orcid-badge-and-tooltip/orcid-badge-and-tooltip.component';
import { TruncatableComponent } from '../../../../shared/truncatable/truncatable.component';
import { KwareTranslatePipe } from '../../../../shared/utils/kware-translate.pipe';
import { LocaleService } from 'src/app/core/locale/locale.service';
import { DSONameService } from 'src/app/core/breadcrumbs/dso-name.service';
import { NgClass, NgIf, NgFor, NgStyle } from '@angular/common';

@Component({
  selector: 'ds-person-item-metadata-list-element',
  templateUrl: './person-item-metadata-list-element.component.html',
  standalone: true,
  imports: [
    NgbTooltipModule,
    OrcidBadgeAndTooltipComponent,
    RouterLink,
    TruncatableComponent,
    KwareTranslatePipe,
    NgClass,
    NgIf, 
    NgFor,
    NgStyle
  ],
})
/**
 * The component for displaying an item of the type Person as a metadata field
 */
export class PersonItemMetadataListElementComponent extends ItemMetadataRepresentationListElementComponent {
  isPublication: boolean;
  constructor(
    public dsoNameService: DSONameService,
    public localeService: LocaleService /* kware edit - call service from LocaleService */
  ) {
    super();
    this.isPublication = document.URL.includes('entities/publication');
  }

  // replace comma ', or ;' to '،' if language  is Arabic
  convertComma(str: string): string {
    let newstr = '';
    if (this.localeService.getCurrentLanguageCode() === 'ar') {
      let regx = /;|,/gi;
      newstr = str.replace(regx, '،');
      return newstr;
    } else {
      return str;
    }
  }

  // kware end edit -- issue.8.0.021
}
