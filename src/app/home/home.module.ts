import { NgModule } from '@angular/core';

import { HomeComponent } from './home.component';
import { PlayerModule } from '../player/index';
import { VideosSidebarModule } from '../videos-sidebar/index';
import { Communication } from './../data-services/communication';
import { VideoService } from './../services/video.service';
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
    Communication,
    VideoService
  ]
})

export class HomeModule {

}
