const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./database.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) console.log('malumotlar bazasiga ulanib bolmadi!');
    console.log('malumotlar bazasiga ulnish mofaqqiyatli')
})
module.exports = db;