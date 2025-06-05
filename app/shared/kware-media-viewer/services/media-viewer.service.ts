/* eslint-disable @typescript-eslint/member-ordering */
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MediaViewerService {
  /** File Metadata  */
  private fileMetadata$ = new BehaviorSubject({
    id: null,
    format: null,
    name: null,
    canDownload: null,
    canRequestACopy: null,
    bitstreamPath: null,
    contentLink: null,
  });
  fileMetadata = this.fileMetadata$.asObservable();
  setFileMetadata(metadata: any) {
    this.fileMetadata$.next(metadata);
  }

  /** Viewer Panels Status */
  private viewerPanelsStatus$ = new BehaviorSubject({
    isFilesMenuOpen: true,
    isViewerPanelOpen: true,
  });
  viewerPanelsStatus = this.viewerPanelsStatus$.asObservable();
  setViewerPanelsStatus(panelsStatusObj) {
    this.viewerPanelsStatus$.next(panelsStatusObj);
  }

  /** isFullScreen */
  private isFullScreen$ = new BehaviorSubject<boolean>(false);
  isFullScreen = this.isFullScreen$.asObservable();
  setFullScreenStatus(status) {
    this.isFullScreen$.next(status);
  }

  /** isFirstFileClicked */
  private isFirstFileClicked$ = new BehaviorSubject<boolean>(false);
  isFirstFileClicked = this.isFirstFileClicked$.asObservable();
  setFirstFileClicked(status) {
    this.isFirstFileClicked$.next(status);
  }

  /** Selected File */
  private selectedFile$ = new BehaviorSubject<number>(0);
  selectedFile = this.selectedFile$.asObservable();
  setSelectedFileIndex(index: number) {
    this.selectedFile$.next(index);
  }

  /** Pre Fetched Files */
  private preFetchedFiles$ = new BehaviorSubject([]);
  preFetchedFiles = this.preFetchedFiles$.asObservable();
  addToFetchedFilesList(files) {
    const current: any = this.preFetchedFiles$.getValue();
    this.preFetchedFiles$.next([...current, ...files]);
  }
}
