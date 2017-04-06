import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  moduleId: module.id,
  selector: 'as-player-settings',
  templateUrl: 'player-settings.component.html'
})


export class PlayerSettingsComponent {
  public playerSettingsForm: FormGroup;

  public repeatVideoLiteral: string = 'repeatVideo';
  public repeatPlaylistLiteral: string = 'repeatPlaylist';
  public shufflePlayLiteral: string = 'shufflePlay';

  @Input() playerSettings: boolean;
  @Output() repeatVideoClickEventHandler: EventEmitter<boolean> = new EventEmitter();
  @Output() repeatPlaylistClickEventHandler: EventEmitter<boolean> = new EventEmitter();
  @Output() shufflePlayClickEventHandler: EventEmitter<boolean> = new EventEmitter();

  constructor(
    private _formBuilder: FormBuilder
  ) {
    this.playerSettingsForm = this._formBuilder.group({
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
      this.repeatVideoClickEventHandler.emit();
    });

    this.playerSettingsForm.controls[this.repeatPlaylistLiteral].valueChanges.subscribe((value) => {
      if (value && this.playerSettingsForm.controls[this.repeatVideoLiteral].value) {
        this.playerSettingsForm.controls[this.repeatVideoLiteral].setValue(false);
      }
      if (this.playerSettingsForm.controls[this.shufflePlayLiteral].value) {
        this.repeatPlaylistClickEventHandler.emit(true);
      } else {
        this.repeatPlaylistClickEventHandler.emit();
      }
    });

    this.playerSettingsForm.controls[this.shufflePlayLiteral].valueChanges.subscribe((value) => {
      if (value && this.playerSettingsForm.controls[this.repeatVideoLiteral].value) {
        this.playerSettingsForm.controls[this.repeatVideoLiteral].setValue(false);
      }
      this.shufflePlayClickEventHandler.emit(value);
    });
  }
}
