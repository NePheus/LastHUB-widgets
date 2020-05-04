import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector, DoBootstrap } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { TestComponent } from './test/test.component';

@NgModule({
    declarations: [TestComponent],
    imports: [BrowserModule],
    entryComponents: [TestComponent],
})
export class AppModule implements DoBootstrap {
    constructor(private _injector: Injector) {}

    ngDoBootstrap() {
        const el = createCustomElement(TestComponent, { injector: this._injector });
        customElements.define('hub-widget-testing', el);
    }
}
