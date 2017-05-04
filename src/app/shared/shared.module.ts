import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule }  from '@angular/common';

import { TranslateModule } from 'ng2-translate';


@NgModule({
    imports: [
        CommonModule
    ],
    exports: [
        BrowserModule,
        ReactiveFormsModule,
        TranslateModule
    ]
})

export class SharedModule {

}
