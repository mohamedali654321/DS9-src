import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import { ComcolPageContentComponent as BaseComponent } from '../../../../../../app/shared/comcol/comcol-page-content/comcol-page-content.component';
import { KwareTranslatePipe } from 'src/app/shared/utils/kware-translate.pipe';

@Component({
  selector: 'ds-themed-comcol-page-content',
  // styleUrls: ['./comcol-page-content.component.scss'],
  styleUrls: ['../../../../../../app/shared/comcol/comcol-page-content/comcol-page-content.component.scss'],
  // templateUrl: './comcol-page-content.component.html',
  templateUrl: '../../../../../../app/shared/comcol/comcol-page-content/comcol-page-content.component.html',
  imports: [
    TranslateModule,
    KwareTranslatePipe
  ],
  standalone: true,
})
export class ComcolPageContentComponent extends BaseComponent {
}
