import { NgModule } from '@angular/core';

import { VideoDetailsComponent } from './video-details.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    VideoDetailsComponent
  ],
  imports: [
    SharedModule
  ],
  exports: [
    VideoDetailsComponent
  ]
})

export class VideoDetailsModule {

}
