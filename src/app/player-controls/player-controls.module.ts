import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { PlayerProgressBarModule } from './../player-progress-bar/player-progress-bar.module';

import { PlayerControlsComponent } from './index';
import { DocumentMozMsPrefixesRefService } from './../services/document.service';

@NgModule({
  imports: [
    SharedModule,
    PlayerProgressBarModule
  ],
  exports: [
    PlayerControlsComponent
  ],
  declarations: [
    PlayerControlsComponent
  ],
  providers: [
    DocumentMozMsPrefixesRefService
  ]
})

export class PlayerControlsModule {

}
