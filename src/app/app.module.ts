import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule, Http } from '@angular/http';

import { APP_PROVIDERS } from './app.providers';
import { AppComponent } from './app.component';
import { appRoutingProviders, routing } from './app.routing';

import { VideoService } from './services/video.service';

import { PlayerModule } from './player/player.module';


@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        PlayerModule,
        HttpModule,
        routing
    ],
    providers: [
        APP_PROVIDERS,
        appRoutingProviders,
        {
            provide: VideoService,
            useFactory: (http) => {
                return new VideoService(http);
            },
            deps: [Http]
        },
    ],
    bootstrap: [ AppComponent ]
})
export class AppModule {
}
