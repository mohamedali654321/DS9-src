/* eslint-disable unused-imports/no-unused-imports */
import {
  Component,
  Input,
  ViewChild,
  ElementRef,
  OnInit,
  ViewEncapsulation,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { MediaViewerService } from '../../services/media-viewer.service';
import { LocaleService } from 'src/app/core/locale/locale.service';
import { PDFDocument } from 'pdf-lib';
import { NgIf, NgClass, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { StopContextMenuDirective } from 'src/app/shared/kware-custom-directives/stop-context-menu-directive/stop-context-menu.directive';
import { ViewerWrapperComponent } from '../../shared/viewer-wrapper/viewer-wrapper.component';
import { PdfJsViewerModule } from 'ng2-pdfjs-viewer';

@Component({
  selector: 'ds-kware-pdf-viewer',
  templateUrl: './kware-pdf-viewer.component.html',
  styleUrls: ['./kware-pdf-viewer.component.scss'],
  standalone:true,
  imports:[NgIf,NgClass,StopContextMenuDirective,NgFor,ViewerWrapperComponent,TranslateModule,FormsModule,PdfJsViewerModule]
  // encapsulation: ViewEncapsulation.Emulated,
})
export class KwarePdfViewerComponent implements OnInit, OnChanges {
  @ViewChild('parentContainer') parentContainer: ElementRef;
  @ViewChild('viewerContainer') viewerContainer: ElementRef;
  @ViewChild('pdfJsViewer') pdfJsViewer: any;

  @Input() fileMeta;
  @Input() isMobile: boolean;
  @Input() closeViewer: () => void;
  @Input() viewerPanelsStatus: any;

  @Input() fileUrl: string;
  @Input() fileformat: string;

  localeCode = '';

  currentBrightnessValue = 100;
  maxBrightnessValue = 250;
  minBrightnessValue = 100;


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

  constructor(private viewerService: MediaViewerService, private localeService: LocaleService) {
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.fileUrl?.currentValue) {
      console.log('changes.fileUrl.currentValue: ', changes.fileUrl.currentValue);
      if (this.pdfJsViewer) {
        this.pdfJsViewer.pdfSrc = encodeURIComponent(changes.fileUrl.currentValue);
        this.pdfJsViewer.refresh();
      }
    }
  }

  ngOnInit() {
    this.fileUrl = encodeURIComponent(this.fileUrl);
    this.localeCode = this.localeService.getCurrentLanguageCode();
  }

  async watermarkPdfFile(actionType: string) {
    const waterMarkImage = '../../../assets/images/KwareLatest.png';
    const imageBuffer = await fetch(waterMarkImage).then(res => res.arrayBuffer());

    const existingPdfBytes = await
      fetch(decodeURIComponent(this.fileUrl)).then(res => res.arrayBuffer());
    const pdfDoc = await PDFDocument.load(existingPdfBytes);

    const image = await pdfDoc.embedPng(imageBuffer);

    const pages = pdfDoc.getPages();
    pages.forEach(page => {
      const { width, height } = image.scale(0.2);
      page.drawImage(image, {
        x: page.getWidth() / 2 - width / 2,
        y: page.getHeight() / 2 - height / 2,
        width: width,
        height: height,
        opacity: 0.1,
      });
    });
    const pdfBytes = await pdfDoc.save();

    if (actionType === 'download') {
      this.downloadPdf(this.fileMeta.name, pdfBytes);
    } else {
      this.printPdf(pdfBytes);
    }
  }

  downloadPdf(filename: string, byte: any) {
    console.log(this.fileformat);
    let blob = new Blob([byte], { type: this.fileformat });
    let link = document.createElement('a');
    const Url = URL.createObjectURL(blob);
    link.href = Url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(Url);
  }

  printPdf(byte: any) {
    let blob = new Blob([byte], { type: this.fileformat });
    const blobUrl = window.URL.createObjectURL(blob);
    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    iframe.src = blobUrl;
    document.body.appendChild(iframe);
    iframe.onload = () => {
      setTimeout(() => {
        iframe.focus();
        iframe.contentWindow.print();
      });
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

  changeBrightnessValue = ($event) => {
    this.currentBrightnessValue = Number($event.target.value);
    this.viewerContainer.nativeElement.style.filter = `brightness(${this.currentBrightnessValue}%)`;
  };
}
