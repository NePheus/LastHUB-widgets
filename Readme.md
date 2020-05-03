# How to: Create a new widget with angular elements

- Create a new angular project in the 'src' folder and prepare it for web component deployment:

  ```
  ng new WIDGETNAME
  ng add @angular/elements
  npm i fs-extra concat --save-dev
  ```

- Create dist.js and widget.json in the root folder of your project:

  dist.js

  ```
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
  ```

  widget.json

  ```
  {
      "Id": "WIDGETIDENTIFIER",
      "Name": "WIDGETNAME",
      "Description": "WIDGETDESCRIPTION",
      "Color": "#0094ff",
      "Icon": "bullseye",
      "IconColor": "white",
      "Placeholder": [
          {
              "Id": "placeholder1",
              "Name": "Placeholder 1",
              "Description": "Test 1"
          },
          {
              "Id": "placeholder2",
              "Name": "Placeholder 2",
              "Description": "Test 2"
          },
      ]
  }
  ```

- Modify app.module:

  ```
  @NgModule({
      ...
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
  ```

- Modify app.component:

  ```
  @Component({
      ...
      encapsulation: ViewEncapsulation.ShadowDom,
  })
  ```

- Add the following line to the 'scripts' area of the package.json:

  ```
  "createWebComponent": "ng build --prod --output-hashing=none && dist.js"
  ```

- Deploy web component:

  ```
  npm run createWebComponent
  ```
