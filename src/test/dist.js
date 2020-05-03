const fs = require('fs-extra');
const concat = require('concat');
(async function build() {
    const files = [
        './dist/test/main.js',
        './dist/test/polyfills.js',
        './dist/test/runtime.js'
    ]
    await fs.ensureDir('../../dist/test/')
    await fs.copy('widget.json', '../../dist/test/widget.json')
    await concat(files, '../../dist/test/widget.js')
})()
