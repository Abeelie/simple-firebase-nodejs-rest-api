'use strict';

const firebase = require('../db');
const firestore = firebase.firestore();
const Todo = require('../models/todoModel');
const asyncHandler = require('express-async-handler');

const getTodos = asyncHandler(async (req, res) => {
    try{
        const todos = await firestore.collection('todo');
        const data = await todos.get();
        const allTodos = [];
        if(data.empty) res.status(404).send('No todos');
        else {
        data.forEach(doc => {
            const todo = new Todo(
                doc.data().text,
                doc.data().reason,
                doc.data().where
            )
            allTodos.push(todo);
        });
        res.send(allTodos);
    }
    }catch(error){
        console.error(error);
    }
})


const setTodo = asyncHandler(async (req, res) => {
    try{
        const todo = await firestore.collection('todo').doc().set(req.body);
        res.status(200).json(req.body);
    }catch(error){
        console.error(error);
    }
})


const updateTodo = asyncHandler(async (req, res) => {
    try{
        const id = req.params.id;
        const data = req.body;
        const todo =  await firestore.collection('todo').doc(id);
        await todo.update(data);
        res.status(200).json(data);
    }catch(error){
        console.error(error);
    }
})

const deleteTodo = asyncHandler(async (req, res) => {
    try {
        await firestore.collection('todo').doc(req.params.id).delete();
        res.status(200).json({ id: req.params.id });
    }catch(error){
        console.error(error)
    }
  })


module.exports = {
    getTodos, 
    setTodo, 
    updateTodo, 
    deleteTodo
}