import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { Video } from '../entities/video';

@Component({
  moduleId: module.id,
  selector: 'as-player-settings',
  templateUrl: 'player-settings.component.html',
  styleUrls: ['player-settings.css']
})


export class PlayerSettingsComponent implements OnInit {
  public playerSettingsForm: FormGroup;

  public repeatVideo: FormControl = new FormControl(false);

  @Input() playerSettings: boolean;
  @Input() currentVideo: Video;
  @Output() repeatClickEventHandler = new EventEmitter();

  constructor() {
    this.playerSettingsForm = new FormGroup({
      repeatVideo: this.repeatVideo
    });

    this.repeatVideo.valueChanges.subscribe(() => {
      this.repeatClickEventHandler.emit();
    });
  }

  ngOnInit() {
    console.log(1);
  }
}
