/* eslint-disable unused-imports/no-unused-imports */
import { MediaViewerService } from './services/media-viewer.service';
import {
  Component,
  OnInit,
  OnDestroy,
  Input,
  HostListener,
} from '@angular/core';
import { LocaleService } from 'src/app/core/locale/locale.service';
import { Item } from 'src/app/core/shared/item.model';
import {
  BreakpointObserver,
  Breakpoints,
} from '@angular/cdk/layout';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, concatMap, map, take } from 'rxjs';
import { Bitstream } from 'src/app/core/shared/bitstream.model';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { BitstreamDataService } from 'src/app/core/data/bitstream-data.service';
import { hasValue } from '../empty.util';
import { FileService } from 'src/app/core/shared/file.service';
import { FileMetadataService } from './services/file-metadata.service';
import { ViewerPanelComponent } from './viewer-panel/viewer-panel.component';
import { ItemFilesMenuComponent } from './item-files-menu/item-files-menu.component';
import { AsyncPipe, NgIf, NgStyle } from '@angular/common';

@Component({
  selector: 'ds-kware-media-viewer',
  templateUrl: './kware-media-viewer.component.html',
  styleUrls: ['./kware-media-viewer.component.scss'],
  standalone: true,
  imports:[ViewerPanelComponent,ItemFilesMenuComponent,AsyncPipe,TranslateModule,NgIf,NgStyle]
})
export class KwareMediaViewerComponent implements OnInit, OnDestroy {
  @Input() item: Item;
  bitstreams$: BehaviorSubject<Bitstream[]>;
  isLoading: boolean;
  totalElements: number;
  pageNumber: number;
  pageSize = 25;

  isLastPage: boolean;
  isEmptyList = false;
  localeCode = '';
  fileMeta = {
    id: null,
    format: null,
    name: null,
    canDownload: null,
    canRequestACopy: null,
    bitstreamPath: null,
    contentLink: null,
  };

  fileUrl: any;
  fileFormat: string;
  isMobile: boolean;
  isViewerOpen = false;

  filesMenuWidth: string;

  viewerPanelsStatus = {
    isFilesMenuOpen: true,
    isViewerPanelOpen: true,
  };

  selectedFileIndex = 0;

  /** Detetct mobile device when window resize  */
  // @HostListener('window:resize', ['$event'])
  // onResize(event) {
  //   this.isMobile = this.breakpointObserver.isMatched([
  //     Breakpoints.HandsetLandscape,
  //     Breakpoints.HandsetPortrait,
  //   ]);
  //   if (this.isMobile) {
  //     this.viewerService.setViewerPanelsStatus({
  //       isFilesMenuOpen: true,
  //       isViewerPanelOpen: false,
  //     });

  //     this.filesMenuWidth = '100%';
  //   } else {
  //     this.viewerService.setViewerPanelsStatus({
  //       isFilesMenuOpen: true,
  //       isViewerPanelOpen: true,
  //     });
  //     this.filesMenuWidth = '25%';
  //   }
  // }

  constructor(
    private viewerService: MediaViewerService,
    private localeService: LocaleService,
    private breakpointObserver: BreakpointObserver,
    private httpClient: HttpClient,
    protected bitstreamDataService: BitstreamDataService,
    protected translateService: TranslateService,
    public fileService: FileService,
    private fileMetaService: FileMetadataService,
  ) {
    this.isMobile = this.breakpointObserver.isMatched([
      Breakpoints.HandsetLandscape,
      Breakpoints.HandsetPortrait,
    ]);
  }

  ngOnInit() {
    this.localeCode = this.localeService.getCurrentLanguageCode();
    this.viewerService.fileMetadata.subscribe((meta) => {
      if (this.fileMeta !== meta) {
        this.fileMeta = meta;
      }
    });
    this.viewerService.selectedFile.subscribe(fileIndex => {
      if (fileIndex !== this.selectedFileIndex) {
        this.selectedFileIndex = fileIndex;
      }
    });
    this.viewerService.viewerPanelsStatus.subscribe(viewerStatus => {
      if (this.viewerPanelsStatus !== viewerStatus) {
        this.viewerPanelsStatus = viewerStatus;
      }
    });
    this.isMobile = this.breakpointObserver.isMatched(Breakpoints.Handset);

    /** fetch bitstreams */
    this.onFetchBitstreams();
  }

  onFetchBitstreams() {
    this.isLoading = true;

    if (this.pageNumber === undefined) {
      this.pageNumber = 0;
      this.bitstreams$ = new BehaviorSubject([]);
    } else {
      this.pageNumber++;
    }

    this.httpClient
      .get(this.item?._links?.bundles?.href)
      .pipe(
        map((bundles: any) => {
          console.log(bundles);
          return bundles?._embedded?.bundles?.find(
            (bundle) => bundle.name === 'ORIGINAL'
          );
        }
        ),
        concatMap((res: any) => {
          if (res) {
            return this.httpClient.get(
              `${res?._links?.bitstreams?.href}?page=${this.pageNumber}&size=${this.pageSize}`
            );
          } else {
            this.isLoading = false;
            this.isEmptyList = true;
            return undefined;
          }
        }
        )
      )
      .subscribe((res: any) => {
        if (res && res?._embedded?.bitstreams?.length) {
          const current: Bitstream[] = this.bitstreams$.getValue();
          if (hasValue(res?._embedded?.bitstreams)) {
            res?._embedded?.bitstreams.forEach((bitstream) => {
              bitstream.name = bitstream?.name.replace(/\.[^/.]+$/, '');
              bitstream.format = this.fileMetaService.getFileFormat(bitstream);
              bitstream.canDownload = this.fileMetaService.canDownload(bitstream);
              bitstream.canRequestACopy = this.fileMetaService.canRequestACopy(bitstream);
              bitstream.bitstreamPath = this.fileMetaService.bitstreamPath(bitstream, this.item);
              bitstream.contentLink = this.fileMetaService.getFileContentLink(bitstream);
            });

            const mergedBitstreams = [...current, ...res._embedded.bitstreams].sort((a, b) => a.name.localeCompare(b.name));
            this.handleSelectedFile(mergedBitstreams);
            this.bitstreams$.next(mergedBitstreams);
          }
          this.totalElements = res?.page.totalElements;
          this.isLoading = false;
          this.isLastPage = this.pageNumber + 1 === res?.page.totalPages;
        } else {
          this.isLoading = false;
          this.isEmptyList = true;
        }
      });
  }

  getBitstreamIndexById(bitstreams) {
    return bitstreams.findIndex(bitstream => bitstream.id === this.fileMeta.id);
  }

  handleSelectedFile(mergedBitstreams) {
    let bitstreamIndex;
    if (this.fileMeta.id) {
      bitstreamIndex = this.getBitstreamIndexById(mergedBitstreams);
    } else {
      bitstreamIndex = this.selectedFileIndex;
    }
    const bitstream = mergedBitstreams[bitstreamIndex];
    this.viewerService.setFileMetadata({
      id: bitstream?.id,
      format: bitstream?.format,
      name: bitstream?.name,
      canDownload: bitstream?.canDownload,
      canRequestACopy: bitstream?.canRequestACopy,
      bitstreamPath: bitstream?.bitstreamPath,
      contentLink: bitstream?.contentLink,
    });

    this.viewerService.setSelectedFileIndex(bitstreamIndex);

    if (this.isMobile) {
      if (this.viewerPanelsStatus.isFilesMenuOpen) {
        this.viewerService.setViewerPanelsStatus({
          isFilesMenuOpen: true,
          isViewerPanelOpen: false,
        });
      } else {
        this.viewerService.setViewerPanelsStatus({
          isFilesMenuOpen: false,
          isViewerPanelOpen: true,
        });
      }

    } else {
      this.viewerService.setViewerPanelsStatus({
        isFilesMenuOpen: true,
        isViewerPanelOpen: true,
      });
    }
  }

  onScrollingFinished() {
    this.onFetchBitstreams();
  }

  openViewer() {
    this.isViewerOpen = true;
    if (this.isMobile) {
      this.viewerService.setViewerPanelsStatus({
        isFilesMenuOpen: false,
        isViewerPanelOpen: true,
      });
      this.filesMenuWidth = '100%';
    } else {
      this.viewerService.setViewerPanelsStatus({
        isFilesMenuOpen: true,
        isViewerPanelOpen: true,
      });
      this.filesMenuWidth = '25%';
    }
  }

  closeViewer = (): void => {
    this.isViewerOpen = false;
    this.viewerService.setViewerPanelsStatus({
      isFilesMenuOpen: false,
      isViewerPanelOpen: false,
    });
  };

  ngOnDestroy(): void {
    this.viewerService.setFileMetadata({
      format: null,
      name: '',
      canDownload: null,
      canRequestACopy: null,
      bitstreamPath: null,
      contentLink: null,
    });
    this.viewerService.setViewerPanelsStatus({
      isFilesMenuOpen: false,
      isViewerPanelOpen: false,
    });
  }
}
