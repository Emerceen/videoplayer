import { NgModule } from '@angular/core';

import { VideoDurationComponent } from './video-duration.component';
import { TimeString } from './../time-string/time-string.service';

@NgModule({
  exports: [
    VideoDurationComponent
  ],
  declarations: [
    VideoDurationComponent
  ],
  providers: [
    TimeString
  ]
})

export class VideoDurationModule {

}
