import { NgModule } from '@angular/core';

import { VideoComponent } from './video.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    VideoComponent
  ],
  imports: [
    SharedModule
  ],
  exports: [
    VideoComponent
  ]
})

export class VideoModule {

}
