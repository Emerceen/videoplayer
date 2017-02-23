import { Component, OnInit } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'as-player-settings',
  templateUrl: 'player-settings.component.html',
  styleUrls: ['player-settings.css']
})


export class PlayerSettingsComponent implements OnInit {
  ngOnInit() {
    console.log(1);
  }
}
