import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { VideoControls } from './../entities/video-controls';
import { Video } from './../entities/video';
import { VideoService } from './../services/video.service';

@Component({
  selector: 'app-player-settings',
  templateUrl: 'player-settings.component.html'
})

export class PlayerSettingsComponent {
  public isRepeatedPlaylist: boolean = false;

  public playerSettingsForm: FormGroup;

  public repeatVideoLiteral: string = 'repeatVideo';
  public repeatPlaylistLiteral: string = 'repeatPlaylist';
  public shufflePlayLiteral: string = 'shufflePlay';

  @Input() public currentVideo: Video;
  @Input() public playerSettings: boolean;
  @Input() public videoControls: VideoControls;
  @Input() public videoElement: { nativeElement: HTMLVideoElement };
  @Input() public videos: Array<Video>;

  @Output() public videoControlsChange: EventEmitter<VideoControls> = new EventEmitter();
  @Output() public setPlayedInShuffle: EventEmitter<boolean> = new EventEmitter();
  @Output() public endedEventHandler: EventEmitter<number> = new EventEmitter();
  @Output() public callPlayVideo: EventEmitter<null> = new EventEmitter();
  @Output() public callStopVideo: EventEmitter<null> = new EventEmitter();

  constructor(
    private formBuilder: FormBuilder,
    private videoService: VideoService
  ) {
    this.playerSettingsForm = this.formBuilder.group({
      repeatVideo: false,
      repeatPlaylist: false,
      shufflePlay: false
    });

    this.playerSettingsForm.controls[this.repeatVideoLiteral].valueChanges.subscribe((value) => {
      if (value && this.playerSettingsForm.controls[this.repeatPlaylistLiteral].value) {
        this.playerSettingsForm.controls[this.repeatPlaylistLiteral].setValue(false);
      }
      if (value && this.playerSettingsForm.controls[this.shufflePlayLiteral].value) {
        this.playerSettingsForm.controls[this.shufflePlayLiteral].setValue(false);
      }
      this.repeatCurrentVideo();
    });

    this.playerSettingsForm.controls[this.repeatPlaylistLiteral].valueChanges.subscribe((value) => {
      if (value && this.playerSettingsForm.controls[this.repeatVideoLiteral].value) {
        this.playerSettingsForm.controls[this.repeatVideoLiteral].setValue(false);
      }
      if (this.playerSettingsForm.controls[this.shufflePlayLiteral].value) {
        this.repeatPlaylist(true);
      } else {
        this.repeatPlaylist(false);
      }
    });

    this.playerSettingsForm.controls[this.shufflePlayLiteral].valueChanges.subscribe((value) => {
      if (value && this.playerSettingsForm.controls[this.repeatVideoLiteral].value) {
        this.playerSettingsForm.controls[this.repeatVideoLiteral].setValue(false);
      }
      this.shufflePlay(value);
    });
  }

  initialRandomVideo(): void {
    let randomNumber = Math.floor(Math.random() * this.videos.length);
    this.videoService.changeCurrentVideo(randomNumber);
    this.videoElement.nativeElement.load();
    this.videoControls.stopped = true;
    this.videoControls.played = false;
    this.emitVideoControls();
  }

  resetShufflePlaying(): void {
    this.videos.map(video => {
      video.playedInShuffle = false;
    });
  }

  repeatCurrentVideo(): void {
    if (!this.videoControls.repeated) {
      this.videoElement.nativeElement.onended = () => this.endedRepeatedCurrentVideoEventHandler();
    } else {
      this.videoElement.nativeElement.onended = () => this.endedEventHandler.emit();
    }
    this.videoControls.repeated = !this.videoControls.repeated;
  }

  repeatPlaylist(isShufflePlaying: boolean): void {
    this.isRepeatedPlaylist = !this.isRepeatedPlaylist;
    if (isShufflePlaying) {
      return;
    }
    if (this.isRepeatedPlaylist) {
      this.videoElement.nativeElement.onended = () => this.endedRepeatedPlaylistEventHandler();
    } else {
      this.videoElement.nativeElement.onended = () => this.endedEventHandler.emit();
    }
  }

  shufflePlay(isEnable?: boolean): void {
    let randomNumber: number;
    let shuffleVideoArray: Array<Video>;
    if (isEnable) {
      if (this.videoControls.stopped) {
        this.initialRandomVideo();
      }
      this.videoElement.nativeElement.onended = () => {
        this.setPlayedInShuffle.emit(true);
        shuffleVideoArray = this.videos.filter(video => !video.playedInShuffle);
        if (shuffleVideoArray.length > 0) {
          randomNumber = Math.floor(Math.random() * shuffleVideoArray.length);
          let indexInVideosArray = this.videos.indexOf(shuffleVideoArray[randomNumber]);
          this.videos[indexInVideosArray].playedInShuffle = true;
          this.endedEventHandler.emit(indexInVideosArray);
        } else if (this.isRepeatedPlaylist) {
          this.resetShufflePlaying();
          this.initialRandomVideo();
          this.callPlayVideo.emit();
        } else {
          this.callStopVideo.emit();
          this.resetShufflePlaying();
          this.initialRandomVideo();
        }
      };
    } else {
      this.videoElement.nativeElement.onended = () => this.endedEventHandler.emit();
      this.resetShufflePlaying();
    }
  }

  endedRepeatedCurrentVideoEventHandler(): void {
    this.videoElement.nativeElement.play();
  }

  endedRepeatedPlaylistEventHandler(): void {
    let index = this.videos.indexOf(this.currentVideo) + 1;
    if (index < this.videos.length) {
      this.videoService.changeCurrentVideo(index);
    } else {
      this.videoService.changeCurrentVideo();
    }
    this.videoElement.nativeElement.load();
    this.callPlayVideo.emit();
  }

  emitVideoControls(): void {
    this.videoControlsChange.emit(this.videoControls);
  }
}
