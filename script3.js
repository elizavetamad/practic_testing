const fs = require('fs');

fs.readFile('log.txt', 'utf8', (err, data) => {
    if (err) throw err;  
    const lines = data.split('\n'); 
    const logStats = { INFO: 0, WARNING: 0, ERROR: 0 };  
    const errors = [];  

    lines.forEach(line => {
        const regex = /\[(.*?)\] \[(.*?)\] (.*)/;  
        const match = line.match(regex);
        if (match) {
            const [, dateTime, type, message] = match;  
            logStats[type]++;  
            if (type === 'ERROR') errors.push(`[${dateTime}] ${message}`);  
        }
    });
    
    console.log('Статистика по логам:', logStats);  
    console.log('Список ошибок:', errors);  
});
