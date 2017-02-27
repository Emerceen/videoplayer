import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';


@Component({
  moduleId: module.id,
  selector: 'as-player-settings',
  templateUrl: 'player-settings.component.html'
})


export class PlayerSettingsComponent implements OnInit {
  public playerSettingsForm: FormGroup;

  public repeatVideo: FormControl = new FormControl(false);

  @Input() playerSettings: boolean;
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
