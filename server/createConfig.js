 let { tree, createFile } = require('appbir-fs');

createFile('./config/pathConfig.json', JSON.stringify(tree('./src/assert/'), null, 2));