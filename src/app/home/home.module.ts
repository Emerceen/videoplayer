import { NgModule } from '@angular/core';

import { HomeComponent } from './index';
import { PlayerModule } from '../player/index';
import { VideosSidebarModule } from '../videos-sidebar/index';
import { Communication } from './../services/communication';

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
  ],
  providers: [
    Communication
  ]
})

export class HomeModule {

}
