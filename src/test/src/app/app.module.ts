import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector } from '@angular/core';
import { AppComponent } from './app.component';
import { createCustomElement } from '@angular/elements';

@NgModule({
    declarations: [AppComponent],
    imports: [BrowserModule],
    bootstrap: [AppComponent],
    entryComponents: [AppComponent],
})
export class AppModule {
    constructor(private _injector: Injector) {}

    ngDoBootstrap() {
        const customElement = createCustomElement(AppComponent, {
            injector: this._injector,
        });
        customElements.define('lasthub-test', customElement);
    }
}
