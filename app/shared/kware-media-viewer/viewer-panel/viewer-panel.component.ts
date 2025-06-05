/* eslint-disable unused-imports/no-unused-imports */
import { Component, Input } from '@angular/core';
import { MediaViewerService } from '../services/media-viewer.service';
import { AsyncPipe, NgIf } from '@angular/common';
import { VarDirective } from '../../utils/var.directive';
import { KwareImageViewerComponent } from '../media-viewers/kware-image-viewer/kware-image-viewer.component';
import { KwarePdfViewerComponent } from '../media-viewers/kware-pdf-viewer/kware-pdf-viewer.component';
import { KwareVideoPlayerComponent } from '../media-viewers/kware-video-player/kware-video-player.component';
import { KwareDocumentViewerComponent } from '../media-viewers/kware-document-viewer/kware-document-viewer.component';
import { UnknownFileFormatComponent } from '../shared/unknown-file-format/unknown-file-format.component';
import { LoadingFileComponent } from '../shared/loading-file/loading-file.component';
import { RequestACopyComponent } from '../shared/request-a-copy/request-a-copy.component';

@Component({
  selector: 'ds-viewer-panel',
  templateUrl: './viewer-panel.component.html',
  styleUrls: ['./viewer-panel.component.scss'],
  standalone: true,
  imports: [
    NgIf,
    VarDirective,
    AsyncPipe,
    KwareImageViewerComponent,
    KwarePdfViewerComponent,
    KwareVideoPlayerComponent,
    KwareImageViewerComponent,
    KwareDocumentViewerComponent,
    UnknownFileFormatComponent,
    LoadingFileComponent,
    RequestACopyComponent
  ],
})
export class ViewerPanelComponent {
  @Input() localeCode: string;
  @Input() isMobile: boolean;
  @Input() viewerPanelsStatus: any;
  @Input() fileMeta: any;
  @Input() fileUrl: any;
  @Input() isLoading: boolean;
  @Input() isEmptyList: boolean;
  @Input() closeViewer: () => void;

  msFilesFormats = [
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/msword',
    'application/vnd.ms-powerpoint',
    'application/vnd.ms-excel',
  ];

  constructor(private viewerService: MediaViewerService) {}
}
