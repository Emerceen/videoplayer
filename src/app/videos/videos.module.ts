import { NgModule } from '@angular/core';

import { VideosComponent } from './videos.component';
import { SharedModule } from '../shared/shared.module';
import { NumberSpacingPipe } from '../number-spacing/number-spacing.pipe';

@NgModule({
  declarations: [
    VideosComponent,
    NumberSpacingPipe
  ],
  imports: [
    SharedModule
  ],
  exports: [
    VideosComponent
  ]
})

export class VideosModule {

}
