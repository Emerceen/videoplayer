import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';

import { PlayerControlsComponent } from './index';
import { DocumentMozMsPrefixesRefService } from './../services/document.service';

@NgModule({
  imports: [
    SharedModule
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
