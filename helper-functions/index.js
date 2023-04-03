const fs = require('fs').promises;

async function readFiles() {
    const data = await fs.readFile('./articles.json', 'utf8');
    return JSON.parse(data);
}

async function updateFiles(data) {
    await fs.writeFile('./articles.json', JSON.stringify(data, null, 2));
}

module.exports = {
    readFiles,
    updateFiles
}