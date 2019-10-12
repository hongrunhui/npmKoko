const fs = require('fs');
const content = fs.readFileSync('../../front-end/src/components/Home/HomeCopy.vue', 'utf-8');
const name = process.argv[2];
const newContent = content.replace(/\$\{name\}/g, name);
fs.writeFileSync('../../front-end/src/components/Home/Home.vue', newContent);