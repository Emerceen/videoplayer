import { NgModule } from '@angular/core';

import { VideosSidebarComponent } from './videos-sidebar.component';
import { VideosModule } from '../videos/videos.module';

@NgModule({
  declarations: [
    VideosSidebarComponent
  ],
  imports: [
    VideosModule
  ],
  exports: [
    VideosSidebarComponent
  ]
})

export class VideosSidebarModule {

}
