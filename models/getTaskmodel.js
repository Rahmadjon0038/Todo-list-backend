const db = require('../config/db');

const getTask = () => {
    return new Promise((resolve, reject) => {
        db.all('SELECT * FROM mydata', (err, rows) => {
            if (err) return reject(err);
            resolve(rows);
        });
    });
};

const updatePatch = (id, created) => {
    return new Promise((resolve, reject) => {
        const sql = 'UPDATE mydata SET created = ? WHERE id = ?';
        db.run(sql, [created ? 1 : 0, id], function (err) {
            if (err) return reject(err);
            if (this.changes === 0) return reject(new Error('Malumot topilmadi'));
            resolve({ msg: 'Malumot muvaffaqiyatli yangilandi' });
        });
    });
};

const addTask = (task) => {
    return new Promise((resolve, reject) => {
        const sql = 'INSERT INTO mydata (task, created) VALUES (?, ?)';
        db.run(sql, [task, 0], function (err) {
            if (err) return reject(err);
            resolve({ msg: 'Yangi todo muvaffaqiyatli qo‘shildi', id: this.lastID });
        });
    });
};

const deleteTask = (id) => {
    return new Promise((resolve, reject) => {
        const sql = 'DELETE FROM mydata WHERE id = ?';
        db.run(sql, [id], function (err) {
            if (err) return reject(err);
            if (this.changes === 0) return reject(new Error('Malumot topilmadi'));
            resolve({ msg: 'Todo muvaffaqiyatli o‘chirildi' });
        });
    });
};

module.exports = { getTask, updatePatch, addTask, deleteTask };