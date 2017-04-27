import { NgModule } from '@angular/core';

import { HomeComponent } from './index';

import { PlayerModule } from '../player/index';
import { VideosSidebarModule } from '../videos-sidebar/index';


@NgModule({
  imports: [
    PlayerModule,
    VideosSidebarModule
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
