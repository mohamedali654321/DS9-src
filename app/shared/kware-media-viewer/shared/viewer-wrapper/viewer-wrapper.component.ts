import { DOCUMENT, NgClass, NgIf } from '@angular/common';
import {
  Component,
  ElementRef,
  Input,
  ViewChild,
  Inject,
} from '@angular/core';
import { MediaViewerService } from '../../services/media-viewer.service';
import { StopContextMenuDirective } from 'src/app/shared/kware-custom-directives/stop-context-menu-directive/stop-context-menu.directive';

@Component({
  selector: 'ds-viewer-wrapper',
  templateUrl: './viewer-wrapper.component.html',
  styleUrls: ['./viewer-wrapper.component.scss'],
  standalone:true,
  imports:[NgClass,NgIf,StopContextMenuDirective]
})
export class ViewerWrapperComponent {
  @ViewChild('viewerWrapper', { static: false }) viewerWrapper: ElementRef;
  @Input() closeViewer: () => void;
  @Input() isMobile: boolean;
  @Input() viewerPanelsStatus: any;
  @Input() enableFullScreen = true;

  isFullScreen = false;

  constructor(
    private viewerService: MediaViewerService,
    @Inject(DOCUMENT) private documentObject: any
  ) { }

  openFullscreen() {
    const elem = this.viewerWrapper.nativeElement;
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.msRequestFullscreen) {
      elem.msRequestFullscreen();
    } else if (elem.mozRequestFullScreen) {
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) {
      elem.webkitRequestFullscreen();
    }
    this.isFullScreen = true;
    this.viewerService.setFullScreenStatus(true);
  }

  exitFullscreen() {
    if (document.exitFullscreen) {
      this.documentObject.exitFullscreen();
    } else if (this.documentObject.mozCancelFullScreen) {
      /* Firefox */
      this.documentObject.mozCancelFullScreen();
    } else if (this.documentObject.webkitExitFullscreen) {
      /* Chrome, Safari and Opera */
      this.documentObject.webkitExitFullscreen();
    } else if (this.documentObject.msExitFullscreen) {
      /* IE/Edge */
      this.documentObject.msExitFullscreen();
    }
    this.isFullScreen = false;
    this.viewerService.setFullScreenStatus(false);
  }

  setViewerPanelStatus() {
    if (this.isMobile) {
      this.viewerService.setViewerPanelsStatus({
        isFilesMenuOpen: !this.viewerPanelsStatus.isFilesMenuOpen,
        isViewerPanelOpen: false,
      });
    } else {
      this.viewerService.setViewerPanelsStatus({
        isFilesMenuOpen: !this.viewerPanelsStatus.isFilesMenuOpen,
        isViewerPanelOpen: true,
      });
    }
  }
}
