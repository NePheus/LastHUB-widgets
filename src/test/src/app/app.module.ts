import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { TestComponent } from './test/test.component';

@NgModule({
    declarations: [TestComponent],
    imports: [BrowserModule],
    entryComponents: [TestComponent],
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
