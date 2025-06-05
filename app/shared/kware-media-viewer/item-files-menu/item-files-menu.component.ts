/* eslint-disable lodash/import-scope */
/* eslint-disable unused-imports/no-unused-imports */
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { Bitstream } from 'src/app/core/shared/bitstream.model';
import { Item } from 'src/app/core/shared/item.model';
import { MediaViewerService } from '../services/media-viewer.service';
import { BehaviorSubject } from 'rxjs';
import { ViewerFileComponent } from '../item-file/viewer-file.component';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { StopContextMenuDirective } from '../../kware-custom-directives/stop-context-menu-directive/stop-context-menu.directive';
import { ThemedLoadingComponent } from '../../loading/themed-loading.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'ds-item-files-menu',
  templateUrl: './item-files-menu.component.html',
  styleUrls: ['./item-files-menu.component.scss'],
  standalone:true,
  imports:[ViewerFileComponent,NgIf,NgFor,NgClass,StopContextMenuDirective,ThemedLoadingComponent,TranslateModule]
})
export class ItemFilesMenuComponent implements OnInit {
  @ViewChild('filesListContainer', { static: false })
  filesListContainer: ElementRef;
  @ViewChildren('filesIds') filesIds: QueryList<any>;
  @ViewChild(CdkVirtualScrollViewport) virtualScroll: CdkVirtualScrollViewport;
  @Input() item: Item;
  @Input() bitstreams: Bitstream[];
  @Input() totalElements: number;
  @Input() isLoading: boolean;
  @Input() isEmptyList: boolean;
  @Input() isLastPage = false;
  @Input() isMobile: boolean;
  @Input() viewerPanelsStatus: any;
  @Output() scrollingFinished = new EventEmitter<void>();

  items$ = new BehaviorSubject([]);


  pageSize = 20;
  pageNumber = 1;

  fetchedRanges = new Set<number>();


  selectedFile = 0;
  itemSize = 20;
  emitted = false;

  @HostListener('scroll', ['$event'])
  onScroll(event: any) {
    if ((event.target.offsetHeight + event.target.scrollTop) >= (event.target.scrollHeight - 10) && !this.isLoading && !this.isLastPage) {
      this.scrollingFinished.emit();
    }
  }
  constructor(private viewerService: MediaViewerService) { }

  ngOnInit(): void {
    this.viewerService.selectedFile.subscribe(fileIndex => {
      if (this.selectedFile !== fileIndex) {
        this.selectedFile = fileIndex;
      }
    });
  }

  selectedFileClickEvent($event: number) {
    this.selectedFile = $event;
    this.viewerService.setSelectedFileIndex($event);
  }

  onScrollingFinished() {
    this.scrollingFinished.emit();
  }

  handleSeletctedFile() {
    const currentElement = this.filesIds
      .toArray()
      .find((file) => file.fileIndex === this.selectedFile);

    this.viewerService.setFileMetadata({
      id: currentElement.bitstream.id,
      format: currentElement.bitstream?.format,
      name: currentElement.bitstream?.name,
      canDownload: currentElement.bitstream?.canDownload,
      canRequestACopy: currentElement.bitstream?.canRequestACopy,
      bitstreamPath: currentElement.bitstream?.bitstreamPath,
      contentLink: currentElement.bitstream?.contentLink,
    });
    currentElement.scrollToView();
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

  getNextFile() {
    if (!this.selectedFile && this.selectedFile !== 0) {
      this.selectedFile = 0;
      this.viewerService.setSelectedFileIndex(0);
    } else {
      this.selectedFile++;
      this.viewerService.setSelectedFileIndex(this.selectedFile);
    }
    this.handleSeletctedFile();
  }

  getPrevFile() {
    this.selectedFile--;
    this.viewerService.setSelectedFileIndex(this.selectedFile);
    this.handleSeletctedFile();
  }

  trackByIdx(i, item) {
    return item.id;
  }

  setViewerPanelStatus() {
    if (this.isMobile) {
      this.viewerService.setViewerPanelsStatus({
        isFilesMenuOpen: !this.viewerPanelsStatus.isFilesMenuOpen,
        isViewerPanelOpen: !this.viewerPanelsStatus.isViewerPanelOpen,
      });
    } else {
      this.viewerService.setViewerPanelsStatus({
        isFilesMenuOpen: !this.viewerPanelsStatus.isFilesMenuOpen,
        isViewerPanelOpen: true,
      });
    }
  }
}
