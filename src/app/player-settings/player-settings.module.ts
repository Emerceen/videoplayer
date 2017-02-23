import { NgModule } from '@angular/core';

import { PlayerSettingsComponent } from './player-settings.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  imports: [
    SharedModule
  ],
  exports: [
    PlayerSettingsComponent
  ],
  declarations: [
    PlayerSettingsComponent
  ]
})


export class PlayerSettingsModule {

}
