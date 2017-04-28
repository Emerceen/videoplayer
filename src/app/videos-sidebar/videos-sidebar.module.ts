import { NgModule } from '@angular/core';

import { VideosSidebarComponent } from './videos-sidebar.component';
import { VideoModule } from './../video/video.module';

@NgModule({
  declarations: [
    VideosSidebarComponent
  ],
  imports: [
    VideoModule
  ],
  exports: [
    VideosSidebarComponent
  ]
})

export class VideosSidebarModule {

}
