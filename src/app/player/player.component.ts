import { Component, OnInit } from '@angular/core';
import { Communication } from '../services/communication';

@Component({
  moduleId: module.id,
  selector: 'as-player',
  templateUrl: 'player.component.html'
})

export class PlayerComponent implements OnInit {

  constructor(
    private _cm: Communication
  ) {}

  ngOnInit(): boolean {
    this._cm.videoService.getVideoUrls().subscribe(
      res => {
        return res;
      }
    );
    return true;
  }
}
