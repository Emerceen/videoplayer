import { NgModule } from '@angular/core';

import { NumberSpacingPipe } from './number-spacing.pipe';

@NgModule({
  declarations: [
    NumberSpacingPipe
  ],
  exports: [
    NumberSpacingPipe
  ]
})

export class NumberSpacingModule {

}
