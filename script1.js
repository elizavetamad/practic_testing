const fs = require('fs');

fs.readFile('input.txt', 'utf8', (err, data) => {
    if (err) throw err;  
    const lines = data.split('\n');  
    lines.forEach((line, index) => {
        console.log(`${index + 1}: ${line}`);  
    });
});
