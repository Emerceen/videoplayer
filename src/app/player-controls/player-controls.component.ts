import { VideoControls } from './../entities/video-controls';
import { Component, Input, Output, EventEmitter, ElementRef } from '@angular/core';

import { HoverInterface } from './../entities/hover';

import { DocumentMozMsPrefixesRefService } from './../services/document.service';

@Component({
  moduleId: module.id,
  selector: 'as-player-controls',
  templateUrl: 'player-controls.component.html'
})

export class PlayerControlsComponent {
  @Input() public controls: HoverInterface;
  @Input() public videoControls: VideoControls;
  @Input() public isFullScreen: boolean = false;
  @Input() public playerSettings: boolean;
  @Input() public videoWrapperElement: ElementRef;
  @Input() public videoElement: { nativeElement: HTMLVideoElement };
  @Input() public posterUrl: string;

  @Output() public videoControlsChange: EventEmitter<VideoControls> = new EventEmitter();
  @Output() public isFullScreenChange: EventEmitter<boolean> = new EventEmitter();
  @Output() public playerSettingsChange: EventEmitter<boolean> = new EventEmitter();
  @Output() public setCurrentVideo: EventEmitter<number> = new EventEmitter();

  constructor(
    private document: DocumentMozMsPrefixesRefService
  ) { }

  playVideo(): void {
    this.videoControls.stopped = false;
    this.videoControls.played = true;
    this.videoElement.nativeElement.play();
    this.videoElement.nativeElement.poster = '';
    this.emitVideoControls();
  }

  pauseVideo(): void {
    this.videoControls.stopped = false;
    this.videoControls.played = false;
    this.videoElement.nativeElement.pause();
    this.emitVideoControls();
  }

  stopVideo(): void {
    this.videoElement.nativeElement.poster = this.posterUrl;
    this.setCurrentVideo.emit();
    this.videoElement.nativeElement.load();
    this.videoControls.stopped = true;
    this.videoControls.played = false;
    this.emitVideoControls();
  }

  emitVideoControls(): void {
    this.videoControlsChange.emit(this.videoControls);
  }

  changeStatePlayerSettings(): void {
    this.playerSettings = !this.playerSettings;
    this.playerSettingsChange.emit(this.playerSettings);
  }

  toggleFullScreen(): void {
    if (!this.isFullScreen) {
      if (this.videoWrapperElement.nativeElement.webkitRequestFullScreen) {
        this.videoWrapperElement.nativeElement.webkitRequestFullScreen();
      } else if (this.videoWrapperElement.nativeElement.requestFullScreen) {
        this.videoWrapperElement.nativeElement.requestFullScreen();
      } else if (this.videoWrapperElement.nativeElement.mozRequestFullScreen) {
        this.videoWrapperElement.nativeElement.mozRequestFullScreen();
      } else if (this.videoWrapperElement.nativeElement.msRequestFullscreen) {
        this.videoWrapperElement.nativeElement.msRequestFullscreen();
      } else {
        return;
      }
    } else {
      if (this.document.nativeDocument.webkitExitFullscreen) {
        this.document.nativeDocument.webkitExitFullscreen();
      } else if (this.document.nativeDocument.exitFullscreen) {
        this.document.nativeDocument.exitFullscreen();
      } else if (this.document.nativeDocument.mozCancelFullScreen) {
        this.document.nativeDocument.mozCancelFullScreen();
      } else if (this.document.nativeDocument.msExitFullscreen) {
        this.document.nativeDocument.msExitFullscreen();
      } else {
        return;
      }
    }
    this.isFullScreen = !this.isFullScreen;
    this.isFullScreenChange.emit(this.isFullScreen);
  }
}
