import { NumberSpacingPipe } from './../string-spacing/string-spacing.pipe';
import { NgModule } from '@angular/core';

import { VideosComponent } from './videos.component';
import { SharedModule } from '../shared/shared.module';

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
