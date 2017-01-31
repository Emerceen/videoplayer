import { NgModule } from '@angular/core';

import { HomeComponent } from './index';
import { PlayerModule } from '../player/index';


@NgModule({
  imports: [
    PlayerModule
  ],
  declarations: [
    HomeComponent
  ]
})

export class HomeModule {

}
