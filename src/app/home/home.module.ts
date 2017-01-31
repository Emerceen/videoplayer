import { NgModule } from '@angular/core';

import { HomeComponent } from './index';

import { PlayerModule } from '../player/index';


@NgModule({
  imports: [
    PlayerModule
  ],
  exports: [
    HomeComponent
  ],
  declarations: [
    HomeComponent
  ]
})

export class HomeModule {

}
