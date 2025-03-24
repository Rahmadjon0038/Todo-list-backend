// controllers/getTaskcontroller.js
const getTaskmodel = require('../models/getTaskmodel');
const multer = require('multer');
const path = require('path');


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Rasm saqlanadigan papka
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + path.extname(file.originalname)); // Unikal fayl nomi
    },
});

const upload = multer({ storage: storage });

const getTasks = async (req, res) => {
    try {
        const response = await getTaskmodel.getTask();
        res.status(200).json(response);
    } catch (err) {
        res.status(400).json({ msg: 'Malumot olishda xatolik' });
    }
};

const updatePatchs = async (req, res) => {
    try {
        const { id } = req.params;
        const { created } = req.body;
        if (typeof created !== 'boolean') {
            return res.status(400).json({ msg: 'created boolean bo‘lishi kerak' });
        }
        const response = await getTaskmodel.updatePatch(id, created);
        res.status(200).json(response);
    } catch (err) {
        if (err.message === 'Malumot topilmadi') {
            return res.status(404).json({ msg: 'Malumot topilmadi' });
        }
        res.status(500).json({ msg: 'Yangilashda xatolik yuz berdi' });
    }
};

// Rasm yuklash uchun middleware qo‘shildi
const addTasks = async (req, res) => {
    try {
        const { task } = req.body;
        const banner = req.file ? `/uploads/${req.file.filename}` : null; 

        if (!task || typeof task !== 'string' || task.trim().length === 0) {
            return res.status(400).json({ msg: 'task bo‘sh yoki noto‘g‘ri' });
        }

        const response = await getTaskmodel.addTask(task.trim(), banner);
        res.status(201).json(response);
    } catch (err) {
        res.status(500).json({ msg: 'Qo‘shishda xatolik yuz berdi' });
    }
};

const deleteTasks = async (req, res) => {
    try {
        const { id } = req.params;
        const response = await getTaskmodel.deleteTask(id);
        res.status(200).json(response);
    } catch (err) {
        if (err.message === 'Malumot topilmadi') {
            return res.status(404).json({ msg: 'Malumot topilmadi' });
        }
        res.status(500).json({ msg: 'O‘chirishda xatolik yuz berdi' });
    }
};

module.exports = {
    getTasks,
    updatePatchs,
    addTasks: [upload.single('banner'), addTasks], // Multer middleware qo‘shildi
    deleteTasks,
};