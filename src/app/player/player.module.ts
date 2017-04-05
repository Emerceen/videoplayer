import { NgModule } from '@angular/core';

import { PlayerComponent } from './index';

import { PlayerSettingsModule } from '../player-settings/index';

import { Communication } from '../services/communication';
import { DocumentMozMsPrefixesRefService } from '../services/document.service';

import { HoverModule } from '../directives/hover.module';

import { SharedModule } from '../shared/shared.module';


@NgModule({
  exports: [
    PlayerComponent
  ],
  imports: [
    SharedModule,
    PlayerSettingsModule,
    HoverModule
  ],
  declarations: [
    PlayerComponent
  ],
  providers: [
    Communication,
    DocumentMozMsPrefixesRefService
  ]
})

export class PlayerModule {

}
