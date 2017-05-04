import { NgModule } from '@angular/core';

import { VideosComponent } from './videos.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    VideosComponent
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
