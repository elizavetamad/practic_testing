const fs = require('fs');

fs.readFile('data.csv', 'utf8', (err, data) => {
  if (err) {
    console.error(`Ошибка при чтении файла: ${err.message}`);
    return;
  }

  const lines = data.split('\n');
  const users = [];


  const header = lines.shift(); 
  const columnNames = header.split(',');

  for (const line of lines) {
    if (line.trim() === '') continue; 
    const values = line.split(',');

   
    if (values.length !== columnNames.length) {
      console.warn(`Строка пропущена из-за неверного количества столбцов: ${line}`);
      continue;
    }

    const user = {};
    for (let i = 0; i < columnNames.length; i++) {
        const columnName = columnNames[i].trim();
        const value = values[i].trim();

        user[columnName] = value;
    }



    if (!user.name || !user.age || !user.city) {
      console.warn(`Строка пропущена из-за отсутствия необходимых полей: ${line}`);
      continue;
    }

    user.age = parseInt(user.age);

    if (isNaN(user.age)) {
      console.warn(`Строка пропущена из-за неверного формата возраста: ${line}`);
      continue;
    }

    users.push(user);
  }

  users.sort((a, b) => a.age - b.age);

  console.log(JSON.stringify(users, null, 2)); 
});