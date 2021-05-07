const fs = require('fs');
const path = require('path');

const todosPath = '../data/todosData.txt';

const getTodos = (req, res) => {
    fs.readFile(path.resolve(__dirname, todosPath), 'utf8', (err, data) => {
        if (err) {
            console.log(err)
            res.status(400).json(err)
        }
        else {
            res.status(200).json(JSON.parse(data));
        }
    })
}

const getTodosByUser = (req, res) => {
    const userId = req.params.userId;
    if (userId) {
        fs.readFile(path.resolve(__dirname, todosPath), 'utf8', (err, data) => {
            if (err) {
                console.log(err)
                res.status(400).json(err)
            }
            else {
                const todos = JSON.parse(data);
                console.log(todos)
                const todosByUser = todos.filter(todo => todo.userId == userId);
                res.status(200).json(todosByUser);
            }
        })
    }
    else
        res.status(400).json({ message: 'User not found' })
}

const createTodo = (req, res) => {
    let todos = [];

    fs.readFile(path.resolve(__dirname, todosPath), 'utf8', (err, data) => {
        if (err) {
            console.log(err)
            res.status(400).json(err)
        }
        else {
            todos = JSON.parse(data);
            todos.push({ id: todos.length + 1, ...req.body });

            fs.writeFile(path.resolve(__dirname, todosPath), JSON.stringify(todos), (error, result) => {
                if (error) {
                    console.log(err)
                    res.status(400).json(err)
                }
                else {
                    res.status(200).json({ message: 'Created successfuly' });
                }
            })
        }
    })
}

const updateTodo = (req, res) => {
    const id = req.params.id;
    const newTodo = req.body;
    let todos = [];

    fs.readFile(path.resolve(__dirname, todosPath), 'utf8', (err, data) => {
        if (err) {
            console.log(err)
            res.status(400).json(err)
        }
        else {
            todos = JSON.parse(data);
            const updatedTodos = todos.map(todo => {
                return todo.id == id ? newTodo : todo;
            })

            fs.writeFile(path.resolve(__dirname, todosPath), JSON.stringify(updatedTodos), (error, result) => {
                if (error) {
                    console.log(err)
                    res.status(400).json(err)
                }
                else {
                    res.status(200).json({ message: "Updated successfuly" });
                }
            })
        }
    })
}

const deleteTodo = (req, res) => {

    const id = req.params.id;
    let todos = [];

    fs.readFile(path.resolve(__dirname, todosPath), 'utf8', (err, data) => {
        if (err) {
            console.log(err)
            res.status(400).json(err)
        }
        else {
            todos = JSON.parse(data);
            const updatedTodos = todos.filter(todo => todo.id != id);

            fs.writeFile(path.resolve(__dirname, todosPath), JSON.stringify(updatedTodos), (error, result) => {
                if (error) {
                    console.log(err)
                    res.status(400).json(err)
                }
                else {
                    res.status(200).json({ message: "Deleted successfuly" });
                }
            })
        }
    })

}

module.exports = { getTodos, getTodosByUser, createTodo, updateTodo, deleteTodo }