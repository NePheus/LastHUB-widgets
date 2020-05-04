# How to: Create a new widget with angular elements

- Create a new angular project in the 'src' folder and prepare it for web component deployment:

  ```
  ng new WIDGETNAME
  ng add @angular/elements
  npm i fs-extra concat --save-dev
  ```

- Create widget-dist.js and widget-config.json in the root folder of your project:

  widget-dist.js

  ```
  const fs = require('fs-extra');
  const concat = require('concat');
  (function build() {
      fs.readFile(require.resolve('./widget-config.json'), async (config) => {
          const files = [`./dist/${config.id}/main.js`, './dist/${config.id}/polyfills.js', './dist/${config.id}/runtime.js'];
          await fs.ensureDir(`../../dist/${config.id}/`);
          await fs.copy(`widget-config.json', '../../dist/${config.id}/widget.json`);
          await concat(files, `../../dist/${config.id}/widget.js`);
      });
  })();
  ```

  widget-config.json

  ```
  {
      "id": "WIDGETIDENTIFIER",
      "name": "WIDGETNAME",
      "description": "WIDGETDESCRIPTION",
      "color": "#0094ff",
      "icon": "bullseye",
      "iconColor": "white",
      "placeholder": [
          {
              "id": "placeholder1",
              "name": "Placeholder 1",
              "description": "Test 1"
          },
          {
              "id": "placeholder2",
              "name": "Placeholder 2",
              "description": "Test 2"
          },
      ]
  }
  ```

- Create WIDGETNAME.component and add ShadowDom encapsulation:

  ```
  @Component({
      ...
      encapsulation: ViewEncapsulation.ShadowDom,
  })
  ```
  
- Modify app.module:

  ```
  @NgModule({
      ...
      entryComponents: [WIDGETNAMEComponent],
  })
  export class AppModule {
      constructor(private _injector: Injector) {}

      ngDoBootstrap() {
          const customElement = createCustomElement(WIDGETNAMEComponent, {
              injector: this._injector,
          });
          customElements.define('hub-widget-WIDGETNAME', customElement);
      }
  }
  ```

- Add the following line to the 'scripts' area of the package.json:

  ```
  "build:elements": "ng build --prod --output-hashing=none && node widget-dist.js"
  ```

- Deploy web component:

  ```
  npm run build:elements
  ```
