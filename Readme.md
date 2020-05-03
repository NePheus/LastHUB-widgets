Create new widget with angular elements

Prepare widget environment

- new project with: ng new WIDGETNAME
- add angular elements to project: ng add @angular/elements
- npm i fs-extra concat --save-dev
- extend app.module:
  @NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule],
  bootstrap: [AppComponent],
  entryComponents: [AppComponent],
  })
  export class AppModule {
  constructor(private \_injector: Injector) {}

        ngDoBootstrap() {
            const customElement = createCustomElement(AppComponent, {
                injector: this._injector,
            });
            customElements.define('lasthub-test', customElement);
        }

  }

- extend app.component:

  encapsulation: ViewEncapsulation.ShadowDom,

- create dist.js
  const fs = require('fs-extra');
  const concat = require('concat');
  (async function build() {
  const files = [
  './dist/test/main.js',
  './dist/test/polyfills.js',
  './dist/test/runtime.js'
  ]
  await fs.ensureDir('../../dist/test/')
  await concat(files, '../../dist/test/widget.js')
  })()

- add to package.json scripts area:
  "createWebComponent": "ng build --prod --output-hashing=none && dist.js"
