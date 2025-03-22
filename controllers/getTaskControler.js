const getTaskmodel = require('../models/getTaskmodel');

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

const addTasks = async (req, res) => {
    try {
        const { task } = req.body; // task o'rniga title bo'lsa, o'zgartiring
        if (!task || typeof task !== 'string' || task.trim().length === 0) {
            return res.status(400).json({ msg: 'task bo‘sh yoki noto‘g‘ri' });
        }
        const response = await getTaskmodel.addTask(task.trim());
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

module.exports = { getTasks, updatePatchs, addTasks, deleteTasks };