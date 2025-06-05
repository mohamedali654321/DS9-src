/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable unused-imports/no-unused-imports */
import { AsyncPipe } from '@angular/common';
import {
  Component,
  Input,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ViewerWrapperComponent } from '../viewer-wrapper/viewer-wrapper.component';
import { NgIf, NgClass } from '@angular/common';
@Component({
  selector: 'ds-unknown-file-format',
  templateUrl: './unknown-file-format.component.html',
  styleUrls: ['./unknown-file-format.component.scss'],
  standalone:true,
  imports:[ViewerWrapperComponent,NgIf,TranslateModule,RouterLink,AsyncPipe]

  // encapsulation: ViewEncapsulation.Emulated,
})
export class UnknownFileFormatComponent {
  @Input() fileMeta;
  @Input() isMobile: boolean;
  @Input() closeViewer: () => void;
  @Input() viewerPanelsStatus: any;
  @Input() enableFullScreen = false;

  constructor() {
  }

  downloadOtherFileFormat() {
    let link = document.createElement('a');
    link.href = this.fileMeta?.url;
    let fileName = this.fileMeta?.name;
    link.download = fileName;
    link.click();
  }
}
