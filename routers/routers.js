const express = require('express');
const router = express()
const getTaskController = require('../controllers/getTaskControler');


router.get('/', getTaskController.getTasks);
router.patch('/:id', getTaskController.updatePatchs);
router.post('/', getTaskController.addTasks);
router.delete('/:id', getTaskController.deleteTasks);


module.exports = router;
