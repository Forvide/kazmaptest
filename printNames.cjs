const fs = require('fs');
const data = JSON.parse(fs.readFileSync('public/kz.json', 'utf8'));
const names = data.features.map(f => {
    return f.properties;
});
console.log(JSON.stringify(names, null, 2));
