import { NgModule } from '@angular/core';

import { VideosComponent } from './videos.component';
import { SharedModule } from '../shared/shared.module';
import { NumberSpacingModule } from '../number-spacing/number-spacing.module';

@NgModule({
  declarations: [
    VideosComponent
  ],
  imports: [
    SharedModule,
    NumberSpacingModule
  ],
  exports: [
    VideosComponent
  ]
})

export class VideosModule {

}
