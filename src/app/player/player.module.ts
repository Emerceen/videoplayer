import { NgModule } from '@angular/core';

import { PlayerComponent } from './player.component';

import { PlayerSettingsModule } from '../player-settings/index';
import { PlayerControlsModule } from '../player-controls/index';

import { BufferingStateService } from './../services/buffering-state.service';

import { HoverModule } from '../directives/hover.module';

import { SharedModule } from '../shared/shared.module';

@NgModule({
  exports: [
    PlayerComponent
  ],
  imports: [
    SharedModule,
    PlayerSettingsModule,
    PlayerControlsModule,
    HoverModule
  ],
  declarations: [
    PlayerComponent
  ],
  providers: [
    BufferingStateService
  ]
})

export class PlayerModule {

}
