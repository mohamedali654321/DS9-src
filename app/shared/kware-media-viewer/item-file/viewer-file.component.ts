import { MediaViewerService } from '../services/media-viewer.service';
import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { Item } from '../../../core/shared/item.model';
import { ItemFileIconComponent } from '../item-file-icon/item-file-icon.component';
import { AsyncPipe, NgClass, NgIf } from '@angular/common';

@Component({
  selector: 'ds-viewer-file',
  templateUrl: './viewer-file.component.html',
  styleUrls: ['./viewer-file.component.scss'],
  standalone:true,
  imports:[ItemFileIconComponent,AsyncPipe,NgIf,NgClass]
})
export class ViewerFileComponent {
  @Input() bitstream: any;
  @Input() item: Item;
  @Input() fileIndex;
  @Input() currentFileIndex: number;
  @Output() selectedFileEmitter = new EventEmitter<number>();
  @ViewChild('selectedFileRef') selectedFileRef: ElementRef<any>;
  @Input() isMobile: boolean;
  @Input() viewerPanelsStatus: any;

  constructor(
    private viewerService: MediaViewerService,
  ) { }

  emitMediaViewerSwitcher() {
    this.viewerService.setFileMetadata({
      id: this.bitstream.id,
      format: this.bitstream?.format,
      name: this.bitstream?.name,
      canDownload: this.bitstream?.canDownload,
      canRequestACopy: this.bitstream?.canRequestACopy,
      bitstreamPath: this.bitstream?.bitstreamPath,
      contentLink: this.bitstream?.contentLink,
    });
    this.selectedFileEmitter.emit(this.fileIndex);
    this.scrollToView();

    if (this.isMobile) {
      this.viewerService.setViewerPanelsStatus({
        isFilesMenuOpen: false,
        isViewerPanelOpen: true,
      });
    } else {
      this.viewerService.setViewerPanelsStatus({
        isFilesMenuOpen: true,
        isViewerPanelOpen: true,
      });
    }
  }

  scrollToView() {
    this.selectedFileRef?.nativeElement?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'start',
    });
  }
}
