const express = require('express');

const router = express.Router();
const { getTodos, getTodosByUser, createTodo, updateTodo, deleteTodo } = require('../controllers/todosController');

const { logTodos } = require('../middlewares/logger')

router.get('/', logTodos, getTodos)
router.get('/user/:userId', logTodos, getTodosByUser)
router.post('/', logTodos, createTodo)
router.put('/:id', logTodos, updateTodo)
router.delete('/:id', logTodos, deleteTodo)


module.exports = router;
