const fs = require('fs');
const content = fs.readFileSync('../../necoo/src/pages/Api2html/index_copy.js', 'utf-8');
const name = process.argv[2];
const newContent = content.replace(/\$\{name\}/g, name);
fs.writeFileSync('../../necoo/src/pages/Api2html/index.js', newContent);