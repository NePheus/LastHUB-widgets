import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector } from '@angular/core';
import { AppComponent } from './app.component';
import { createCustomElement } from '@angular/elements';
import { TestComponent } from './test/test.component';

@NgModule({
    declarations: [AppComponent, TestComponent],
    imports: [BrowserModule],
    bootstrap: [AppComponent],
    entryComponents: [AppComponent],
})
export class AppModule {
    constructor(private _injector: Injector) {}

    ngDoBootstrap() {
        const customElement = createCustomElement(TestComponent, {
            injector: this._injector,
        });
        customElements.define('hub-widget-test', customElement);
    }
}
