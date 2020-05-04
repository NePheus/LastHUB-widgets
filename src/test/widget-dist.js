const fs = require('fs-extra');
const concat = require('concat');
(function build() {
    fs.readFile(require.resolve('./widget-config.json'), async (e, config) => {
        config = JSON.parse(config);
        const files = [`./dist/${config.id}/main.js`, `./dist/${config.id}/polyfills.js`, `./dist/${config.id}/runtime.js`];
        await fs.ensureDir(`../../dist/${config.id}/`);
        await fs.copy(`widget-config.json`, `../../dist/${config.id}/widget.json`);
        await concat(files, `../../dist/${config.id}/widget.js`);
    });
})();
