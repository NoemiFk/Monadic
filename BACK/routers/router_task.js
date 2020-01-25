const express = require('express')
const r = express.Router()
const task = require('../src/tasks/controller_task')

r.get('/task', task.get_task)

r.get('/tasks', task.get_tasks)

r.post('/tasks', task.add_task)

r.put('/tasks/:id', task.update_task)

r.delete('/tasks/:id', task.delete_task)

module.exports = r