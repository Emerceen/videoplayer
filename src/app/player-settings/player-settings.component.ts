import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  moduleId: module.id,
  selector: 'as-player-settings',
  templateUrl: 'player-settings.component.html'
})


export class PlayerSettingsComponent implements OnInit {
  public playerSettingsForm: FormGroup;

  public repeatVideoLiteral: string = 'repeatVideo';
  public repeatPlaylistLiteral: string = 'repeatPlaylist';

  @Input() playerSettings: boolean;
  @Output() repeatVideoClickEventHandler = new EventEmitter();
  @Output() repeatPlaylistClickEventHandler = new EventEmitter();

  constructor(
    private _formBuilder: FormBuilder
  ) {
    this.playerSettingsForm = this._formBuilder.group({
      repeatVideo: false,
      repeatPlaylist: false
    });

    this.playerSettingsForm.controls[this.repeatVideoLiteral].valueChanges.subscribe(() => {
      this.repeatVideoClickEventHandler.emit();
    });

     this.playerSettingsForm.controls[this.repeatPlaylistLiteral].valueChanges.subscribe(() => {
      this.repeatPlaylistClickEventHandler.emit();
    });
  }

  ngOnInit() {
    console.log(1);
  }
}
