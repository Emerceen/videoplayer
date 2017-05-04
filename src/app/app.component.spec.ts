import {
    RouterTestingModule
} from '@angular/router/testing';
import {
    async,
    TestBed,
    ComponentFixture
} from '@angular/core/testing';
import { provideRoutes, Routes, RouterModule } from '@angular/router';
import { Component } from '@angular/core';

import { AppComponent } from './app.component';

import { TranslateService } from 'ng2-translate';

@Component({
    selector: 'as-test',
    template: ''
})
class TestRouterComponent {
}

let comp: AppComponent;
let fixture: ComponentFixture<AppComponent>;
let translateServiceStub = {
  use: (userLang) => { return userLang; }
};

let config: Routes = [
    {
        path: '', component: TestRouterComponent
    }
];

describe('AppComponent', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                TestRouterComponent,
                AppComponent
            ],
            imports: [ RouterTestingModule, RouterModule ],
            providers: [
                provideRoutes(config),
                { provide: TranslateService, useValue: translateServiceStub }
            ]
        });
    });

    it('should be defined', async(() => {
        TestBed.compileComponents().then(() => {
            fixture = TestBed.createComponent(AppComponent);
            comp = fixture.componentInstance;

            expect(comp).toBeDefined();
        });
    }));
});
