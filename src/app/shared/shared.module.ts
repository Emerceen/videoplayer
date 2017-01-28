import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule }  from '@angular/common';


@NgModule({
    imports: [
        CommonModule
    ],
    exports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule
    ]
})

export class SharedModule {

}
