import { NgModule } from '@angular/core';
import { HoverDirective } from './hover.directive';

@NgModule({
  declarations: [
    HoverDirective
  ],
  exports: [
    HoverDirective
  ]
})

export class HoverModule {

}
