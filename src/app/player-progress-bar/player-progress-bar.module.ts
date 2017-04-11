import { NgModule } from '@angular/core';

import { PlayerProgressBarComponent } from './player-progress-bar.component';
import { SharedModule } from '../shared/shared.module';
import { HoverPositionDirective } from '../directives/hover-position.directive';

@NgModule({
  declarations: [
    PlayerProgressBarComponent,
    HoverPositionDirective
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
