/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable unused-imports/no-unused-imports */
import {
  Component,
  Input,
} from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ViewerWrapperComponent } from '../viewer-wrapper/viewer-wrapper.component';
import { RouterLink } from '@angular/router';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'ds-request-a-copy',
  templateUrl: './request-a-copy.component.html',
  styleUrls: ['./request-a-copy.component.scss'],
  standalone:true,
  imports:[ViewerWrapperComponent,TranslateModule,RouterLink,AsyncPipe]
})
export class RequestACopyComponent {
  @Input() fileMeta;
  @Input() isMobile: boolean;
  @Input() closeViewer: () => void;
  @Input() viewerPanelsStatus: any;

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
