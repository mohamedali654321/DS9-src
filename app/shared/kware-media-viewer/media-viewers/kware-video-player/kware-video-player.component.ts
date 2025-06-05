/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable unused-imports/no-unused-imports */
import { NgIf, NgClass, NgFor } from '@angular/common';
import { Component, Input, ElementRef, ViewChild, OnInit, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { StopContextMenuDirective } from 'src/app/shared/kware-custom-directives/stop-context-menu-directive/stop-context-menu.directive';
import { ViewerWrapperComponent } from '../../shared/viewer-wrapper/viewer-wrapper.component';
import { HandleDurationTimePipe } from './handle-duration-time.pipe';

@Component({
  selector: 'ds-kware-video-player',
  templateUrl: './kware-video-player.component.html',
  styleUrls: ['./kware-video-player.component.scss'],
  standalone:true,
  imports:[NgIf,NgClass,NgFor,StopContextMenuDirective,ViewerWrapperComponent,TranslateModule,FormsModule,HandleDurationTimePipe]
})
export class KwareVideoPlayerComponent implements OnInit, AfterViewInit, OnChanges {
  @Input() fileMeta;
  @Input() isMobile: boolean;
  @Input() closeViewer: () => void;
  @Input() viewerPanelsStatus: any;
  @Input() enableFullScreen = true;
  @Input() src = '';
  @Input() locale = 'ar';

  @ViewChild('videoCanvas') videoCanvas: ElementRef;
  @ViewChild('videoControlsContainer') videoControlsContainer: ElementRef;

  @ViewChild('viewerContainer', { static: false }) viewerContainer: ElementRef;

  @ViewChild('player') videoPlayer: ElementRef;
  @ViewChild('btnPlayPause') btnPlayPause: HTMLButtonElement;
  @ViewChild('btnMute') btnMute: HTMLButtonElement;
  @ViewChild('progressBar') progressBar: ElementRef;
  @ViewChild('volumeBar') volumeBar: ElementRef;

  videoSrc: string;
  canvas: any;
  context: any;

  waterMarkImage: any;
  canvasInterval = null;

  isPlayed = false;
  isMuted = false;

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.src.currentValue && this.videoSrc !== this.src) {
      this.videoSrc = changes.src.currentValue;
      this.resetPlayer();
    }
  }

  ngAfterViewInit(): void {
    this.viewerContainer.nativeElement.style.height = '100%';
    this.viewerContainer.nativeElement.style.width = '100%';
    this.videoPlayer.nativeElement.style.visibility = 'hidden';
    this.canvas = this.videoCanvas.nativeElement;

    if (this.canvas.getContext) {
      this.context = this.canvas.getContext('2d');
      this.canvas.style.width = '100%';
      this.canvas.style.height = '100%';
    }
  }

  ngOnInit(): void {
    this.getImageFromURL('assets/images/KwareLatest.png', (err, img) => {
      this.waterMarkImage = img;
    });
  }

  loadVideo() {
    const video = this.videoPlayer.nativeElement;
    if (!this.canvas || !video) { return; }

    if (!this.isMobile) {
      this.canvas.style.width = '100%';
      this.canvas.style.height = '100%';
      this.canvas.style.display = 'block';
      this.canvas.width = 300;
      this.canvas.height = 1500;
      // this.canvas.width = 500;
      // this.canvas.height = 600;
    } else {
      this.canvas.style.width = '100%';
      this.canvas.style.height = '70%';
      this.canvas.style.display = 'block';
      this.canvas.width = video.width;
      this.canvas.height = video.height;
    }

    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.context.drawImage(video, 0, 0, this.canvas.width, this.canvas.height);

    this.context.globalAlpha = 0.3;
    this.context.drawImage(
      this.waterMarkImage,
      20, 20,
      60,
      130
    );
  }

  setVolume() {
    this.videoPlayer.nativeElement.volume = this.volumeBar.nativeElement.value / 100;
  }

  playPauseVideo() {
    if (this.videoPlayer.nativeElement.paused || this.videoPlayer.nativeElement.ended) {
      this.videoPlayer.nativeElement.play();
      this.isPlayed = true;
    } else {
      this.videoPlayer.nativeElement.pause();
      this.isPlayed = false;
    }
  }

  onVideoPlay() {
    clearInterval(this.canvasInterval);
    this.canvasInterval = setInterval(() => {
      this.loadVideo();
    }, 1000 / 60);
  }

  onVideoPause() {
    clearInterval(this.canvasInterval);
    this.videoControlsContainer.nativeElement.style.display = 'flex';
  }

  onVideoEnded() {
    clearInterval(this.canvasInterval);
    this.videoControlsContainer.nativeElement.style.display = 'flex';
  }

  stopVideo() {
    clearInterval(this.canvasInterval);
    this.videoPlayer.nativeElement.pause();
    if (this.videoPlayer.nativeElement.currentTime) { this.videoPlayer.nativeElement.currentTime = 0; }
  }

  muteVolume() {
    if (!this.videoPlayer.nativeElement.muted || this.volumeBar.nativeElement.value === 0) {
      this.videoPlayer.nativeElement.muted = true;
      this.isMuted = true;
    } else {
      this.videoPlayer.nativeElement.muted = false;
      this.isMuted = false;
    }
  }

  onCanvasMouseEnter() {
    this.videoControlsContainer.nativeElement.style.display = 'flex';
  }

  onCanvasMouseLeave() {
    if (!this.videoPlayer.nativeElement.paused && !this.videoPlayer.nativeElement.ended) {
      this.videoControlsContainer.nativeElement.style.display = 'none';
    } else {
      this.videoControlsContainer.nativeElement.style.display = 'flex';
    }
  }

  replayVideo() {
    this.resetPlayer();
    this.playPauseVideo();
  }

  updateProgressBar() {
    let percentage = Math.floor((100 / this.videoPlayer.nativeElement.duration) * this.videoPlayer.nativeElement.currentTime);
    this.progressBar.nativeElement.value = percentage;
  }

  onVideoSeek(e) {
    let percent = Math.round((e.offsetX / e.target.clientWidth) * 100);
    if (this.locale === 'ar') {
      percent = 100 - Math.round((e.offsetX / e.target.clientWidth) * 100);
    }
    this.videoPlayer.nativeElement.currentTime = (this.videoPlayer.nativeElement.duration / 100) * percent;
  }

  resetPlayer() {
    if (this.progressBar?.nativeElement && this.videoPlayer?.nativeElement) {
      this.progressBar.nativeElement.value = 0;
      this.videoPlayer.nativeElement.currentTime = 0;
      this.isPlayed = false;
    }
  }

  private getImageFromURL = (url, cb) => {
    const img = new Image();
    img.onload = () => cb(null, img);
    img.onerror = (err) => cb(err);
    img.crossOrigin = 'anonymous';
    img.src = url;
  };

  downloadVideo = () => {
    let link = document.createElement('a');
    link.href = this.videoSrc;
    link.download = this.fileMeta.fileName;
    link.click();
    URL.revokeObjectURL(this.videoSrc);
  };
}
