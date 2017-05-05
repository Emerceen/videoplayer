import { NgModule } from '@angular/core';

import { HomeComponent } from './index';
import { PlayerModule } from '../player/index';
import { VideosSidebarModule } from '../videos-sidebar/index';
import { Communication } from './../services/communication';
import { VideoDetailsModule } from './../video-details/video-details.module';

@NgModule({
  imports: [
    PlayerModule,
    VideosSidebarModule,
    VideoDetailsModule
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
