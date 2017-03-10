import { NgModule } from '@angular/core';

import { PlayerComponent } from './index';

import { PlayerSettingsModule } from '../player-settings/index';

import { Communication } from '../services/communication';
import { DocumentMozMsPrefixesRefService } from '../services/document.service';

import { SharedModule } from '../shared/shared.module';


@NgModule({
  exports: [
    PlayerComponent
  ],
  imports: [
    SharedModule,
    PlayerSettingsModule
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
