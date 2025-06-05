import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ThemedLoadingComponent } from 'src/app/shared/loading/themed-loading.component';
import { ViewerWrapperComponent } from '../viewer-wrapper/viewer-wrapper.component';

@Component({
  selector: 'ds-loading-file',
  templateUrl: './loading-file.component.html',
  styleUrls: ['./loading-file.component.scss'],
  standalone:true,
  imports:[ViewerWrapperComponent,TranslateModule,ThemedLoadingComponent,NgIf]
})
export class LoadingFileComponent {
  @Input() fileMeta;
  @Input() isMobile: boolean;
  @Input() closeViewer: () => void;
  @Input() viewerPanelsStatus: any;
  @Input() enableFullScreen = false;
  @Input() isEmptyList: boolean;
}
