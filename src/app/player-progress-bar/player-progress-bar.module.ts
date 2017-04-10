import { NgModule } from '@angular/core';

import { PlayerProgressBarComponent } from './player-progress-bar.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    PlayerProgressBarComponent
  ],
  imports: [
    SharedModule
  ],
  exports: [
    PlayerProgressBarComponent
  ]
})

export class PlayerProgressBarModule {

}
