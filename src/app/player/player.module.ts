import { NgModule } from '@angular/core';

import { PlayerComponent } from './index';

import { PlayerSettingsModule } from '../player-settings/index';
import { PlayerControlsModule } from '../player-controls/index';

import { Communication } from '../services/communication';

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
    Communication
  ]
})

export class PlayerModule {

}
