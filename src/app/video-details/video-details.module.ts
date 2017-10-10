import { NgModule } from '@angular/core';

import { VideoDetailsComponent } from './video-details.component';
import { SharedModule } from '../shared/shared.module';
import { NumberSpacingModule } from '../number-spacing/number-spacing.module';

@NgModule({
  declarations: [
    VideoDetailsComponent
  ],
  imports: [
    SharedModule,
    NumberSpacingModule
  ],
  exports: [
    VideoDetailsComponent
  ]
})

export class VideoDetailsModule {

}
