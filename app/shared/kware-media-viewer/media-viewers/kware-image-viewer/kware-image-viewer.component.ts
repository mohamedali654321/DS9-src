/* eslint-disable unused-imports/no-unused-imports */
import {
  Component,
  Input,
  ViewChild,
  OnInit,
  ElementRef,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { MediaViewerService } from '../../services/media-viewer.service';
import { NgIf, NgClass, NgFor } from '@angular/common';
import { StopContextMenuDirective } from 'src/app/shared/kware-custom-directives/stop-context-menu-directive/stop-context-menu.directive';
import { ViewerWrapperComponent } from '../../shared/viewer-wrapper/viewer-wrapper.component';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'ds-kware-image-viewer',
  templateUrl: './kware-image-viewer.component.html',
  styleUrls: ['./kware-image-viewer.component.scss'],
  standalone:true,
  imports:[NgIf,NgFor,NgClass,StopContextMenuDirective,ViewerWrapperComponent,TranslateModule,FormsModule,]
})
export class KwareImageViewerComponent implements OnInit, OnChanges {
  @ViewChild('imageCanvas') imageCanvas: ElementRef;
  @ViewChild('zoomCanvas') zoomCanvas: ElementRef;

  @ViewChild('viewerContainer', { static: false }) viewerContainer: ElementRef;

  @Input() fileMeta;
  @Input() closeViewer: () => void;
  @Input() isMobile: boolean;
  @Input() viewerPanelsStatus: any;
  @Input() imageUrl: string;
  @Input() fileformat: string;

  baseImage: any;
  waterMarkImage: any;

  isZoomed = false;
  isMagnifierMode = false;
  mousePosition = { top: 0, left: 0, x: 0, y: 0 };

  currentRotateDegree = 0;

  currentZoomValue = 100;
  maxZoomValue = 250;
  minZoomValue = 100;

  currentBrightnessValue = 100;
  maxBrightnessValue = 250;
  minBrightnessValue = 100;

  canvas: any;
  context: any;

  zoomCan: any;
  zoomCtx: any;
  isStopMoveOnZoom = false;

  isFullScreen = false;
  isLoadingImage: boolean;

  zoomValues: any[] = [
    {
      label: '100%',
      value: 100
    },
    {
      label: '125%',
      value: 125
    },
    {
      label: '150%',
      value: 150
    },
    {
      label: '175%',
      value: 175
    },
    {
      label: '200%',
      value: 200
    },
    {
      label: '225%',
      value: 225
    },
    {
      label: '250%',
      value: 250
    },
  ];

  brightnessValues: any[] = [
    {
      label: '100%',
      value: 100
    },
    {
      label: '125%',
      value: 125
    },
    {
      label: '150%',
      value: 150
    },
    {
      label: '175%',
      value: 175
    },
    {
      label: '200%',
      value: 200
    },
    {
      label: '225%',
      value: 225
    },
    {
      label: '250%',
      value: 250
    },
  ];

  constructor(
    private viewerService: MediaViewerService,
  ) { }


  ngOnInit() {
    this.getImageFromURL('assets/images/KwareLatest.png', (err, img) => {
      this.waterMarkImage = img;
    });
    this.viewerService.isFullScreen.subscribe(fullscreen => {
      if (this.isFullScreen !== fullscreen) {
        this.isFullScreen = fullscreen;
        this.rescaleCanvas(`${Number(this.minZoomValue)}%`);
        this.resetViewerValues();
        this.canvas.style.transform = `rotate(-0deg)`;
        this.canvas.style.transform = 'none';
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes?.imageUrl?.currentValue) {
      this.getImageFromURL(changes.imageUrl.currentValue, (err, img) => {
        if (img !== this.baseImage) {
          this.resetViewerValues();
          this.baseImage = img;
          this.viewerContainer.nativeElement.style.height = '100%';
          this.viewerContainer.nativeElement.style.width = '100%';

          this.canvas = this.imageCanvas.nativeElement;
          this.zoomCan = this.zoomCanvas.nativeElement;

          if (this.zoomCan.getContext) {
            this.zoomCtx = this.canvas.getContext('2d');
          }

          if (this.canvas.getContext) {
            this.context = this.canvas.getContext('2d');
            this.loadImage(img);
            this.isLoadingImage = false;
          }
        }
      });
    }
  }

  private loadImage(image: HTMLImageElement) {
    if (!this.canvas || !image) { return; }

    if (!this.isMobile) {
      this.canvas.style.width = '100%';
      this.canvas.style.height = '100%';
      this.canvas.style.display = 'block';
      this.canvas.width = image.width;
      this.canvas.height = image.height;
    } else {
      this.canvas.style.width = '100%';
      this.canvas.style.height = '70%';
      this.canvas.style.display = 'block';
      this.canvas.width = image.width;
      this.canvas.height = image.height;
    }
    this.viewerContainer.nativeElement.style.overflow = 'hidden';
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.context.drawImage(image, 0, 0, this.canvas.width, this.canvas.height);
  }

  private getImageFromURL = (url, cb) => {
    this.isLoadingImage = true;

    const img = new Image();
    img.onload = () => cb(null, img);
    img.onerror = (err) => cb(err);
    img.crossOrigin = 'anonymous';
    img.src = url;
  };

  private resetViewerValues = () => {
    this.isZoomed = false;
    this.isMagnifierMode = false;
    this.currentRotateDegree = 0;
    this.currentZoomValue = 100;
    this.currentBrightnessValue = 100;
  };



  rescaleCanvas(zoomRatio: any) {
    if (this.context) {
      this.canvas.style.width = zoomRatio;
      this.canvas.style.height = zoomRatio;

      this.viewerContainer.nativeElement.style.overflow = 'hidden';
      this.viewerContainer.nativeElement.style.overflowY = 'auto';
      this.viewerContainer.nativeElement.style.overflowX = 'auto';
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.context.drawImage(this.baseImage, 0, 0, this.canvas.width, this.canvas.height);
    }
  }


  setMagnifierMode() {
    this.isMagnifierMode = !this.isMagnifierMode;
  }

  watermarkImage(actionType: string) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = this.baseImage.width;
    canvas.height = this.baseImage.height;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(
      this.baseImage,
      0,
      0,
      this.baseImage.width,
      this.baseImage.height
    );
    ctx.globalAlpha = 0.15;

    const xCenter = this.baseImage.width / 2 - 300 / 2;
    const yCenter = this.baseImage.height / 2 - 428 / 2;

    ctx.drawImage(
      this.waterMarkImage,
      xCenter,
      yCenter,
      300,
      428
      // this.waterMarkImage.width / 2,
      // this.waterMarkImage.height / 2,
    );

    if (actionType === 'download') {
      this.downloadImage(canvas);
    } else {
      this.printImage(canvas);
    }
  }

  downloadImage = (canvas) => {
    console.log(this.fileformat);
    const image = canvas.toDataURL(this.fileformat);
    const link = document.createElement('a');
    link.href = image;
    link.download = this.fileMeta?.name;
    link.click();
    URL.revokeObjectURL(this.fileMeta?.url);
  };

  printImage(canvas: any) {
    const iframe = document.createElement('iframe');
    canvas.toBlob((blob) => {
      iframe.src = window.URL.createObjectURL(blob);
      iframe.style.display = 'none';
      document.body.appendChild(iframe);
      iframe.onload = () => {
        setTimeout(() => {
          iframe.focus();
          iframe.contentWindow.print();
        });
      };
    }, this.fileformat);
  }

  canvasDoubleClick(e) {
    e.preventDefault();
    if (!this.isZoomed) {
      this.viewerContainer.nativeElement.style.cursor = 'zoom-out';
      this.currentZoomValue = this.maxZoomValue;
      this.rescaleCanvas(`${Number(this.currentZoomValue)}%`);
      this.isZoomed = true;
      this.isStopMoveOnZoom = false;
    } else {
      this.viewerContainer.nativeElement.style.cursor = 'zoom-in';
      this.currentZoomValue = this.minZoomValue;
      this.rescaleCanvas(`${Number(this.currentZoomValue)}%`);
      this.isZoomed = false;
      this.isStopMoveOnZoom = false;
    }
  }

  canvasOnClick() {
    this.isStopMoveOnZoom = !this.isStopMoveOnZoom;
  }

  canvasMouseMove(e) {
    if (this.isMagnifierMode) {
      /** TBD */
    } else if (!this.isStopMoveOnZoom) {
      // How far the mouse has been moved
      const dx = (e.clientX - this.mousePosition.x) * 2;
      const dy = (e.clientY - this.mousePosition.y) * 3;

      // Scroll the image
      this.viewerContainer.nativeElement.scrollTop =
        this.mousePosition.top - dy;
      this.viewerContainer.nativeElement.scrollLeft =
        this.mousePosition.left - dx;
    }
  }

  // Detect mouse position on click or db-click event
  canvasMouseDown(e) {
    this.mousePosition = {
      // Set the current scroll
      left: this.viewerContainer.nativeElement.scrollLeft,
      top: this.viewerContainer.nativeElement.scrollTop,
      // Get the current mouse position
      x: e.clientX,
      y: e.clientY,
    };
  }

  increaseImageBrightness() {
    if (this.currentBrightnessValue < this.maxBrightnessValue) {
      this.currentBrightnessValue += 25;
      this.viewerContainer.nativeElement.style.filter = `brightness(${Number(this.currentBrightnessValue)}%)`;
    }
  }

  decreaseImageBrightness() {
    if (this.currentBrightnessValue > this.minBrightnessValue) {
      this.currentBrightnessValue -= 25;
      this.viewerContainer.nativeElement.style.filter = `brightness(${Number(this.currentBrightnessValue)}%)`;
    }
  }


  imageRotate() {
    if (this.currentRotateDegree === 270) {
      this.currentRotateDegree = 0;
    } else {
      this.currentRotateDegree += 90;
    }

    this.viewerContainer.nativeElement.style.overflow = 'hidden';
    this.viewerContainer.nativeElement.style.overflowY = 'auto';
    this.viewerContainer.nativeElement.style.overflowX = 'auto';
    this.canvas.style.transform = `rotate(-${this.currentRotateDegree}deg)`;
  }

  imageZoomOut() {
    if (this.currentZoomValue >= this.minZoomValue) {
      this.currentZoomValue -= 25;
      this.rescaleCanvas(`${Number(this.currentZoomValue)}%`);
      this.canvas.style.cursor = 'default';
    }
  }

  imageZoomIn() {
    if (this.currentZoomValue <= this.maxZoomValue) {
      this.currentZoomValue += 25;
      this.rescaleCanvas(`${Number(this.currentZoomValue)}%`);
      this.canvas.style.cursor = 'zoom-out';
    }
  }

  changeZoomValue = ($event) => {
    this.currentZoomValue = Number($event.target.value);
    this.rescaleCanvas(`${this.currentZoomValue}%`);
  };

  changeBrightnessValue = ($event) => {
    this.currentBrightnessValue = Number($event.target.value);
    this.viewerContainer.nativeElement.style.filter = `brightness(${this.currentBrightnessValue}%)`;
  };
}
