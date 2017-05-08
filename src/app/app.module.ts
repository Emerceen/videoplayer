import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule, Http } from '@angular/http';

import { APP_PROVIDERS } from './app.providers';
import { AppComponent } from './app.component';
import { appRoutingProviders, routing } from './app.routing';

import { TranslateModule } from 'ng2-translate';

import { VideoDataService } from './data-services/video.service';

import { PlayerModule } from './player/index';
import { HomeModule } from './home/index';


@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        TranslateModule.forRoot(),
        BrowserModule,
        PlayerModule,
        HomeModule,
        HttpModule,
        routing
    ],
    providers: [
        APP_PROVIDERS,
        appRoutingProviders,
        {
            provide: VideoDataService,
            useFactory: (http) => {
                return new VideoDataService(http);
            },
            deps: [Http]
        },
    ],
    bootstrap: [ AppComponent ]
})
export class AppModule {
}
