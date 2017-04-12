import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { PlayerProgressBarModule } from './../player-progress-bar/index';
import { VideoDurationModule } from './../video-duration/index';

import { PlayerControlsComponent } from './index';
import { DocumentMozMsPrefixesRefService } from './../services/document.service';

@NgModule({
  imports: [
    SharedModule,
    PlayerProgressBarModule,
    VideoDurationModule
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
