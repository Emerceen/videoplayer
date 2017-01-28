import { NgModule } from '@angular/core';

import { PlayerComponent } from './index';
import { Communication } from '../services/communication';

@NgModule({
  exports: [
    PlayerComponent
  ],
  declarations: [
    PlayerComponent
  ],
  providers: [
    Communication
  ]
})

export class PlayerModule { }
