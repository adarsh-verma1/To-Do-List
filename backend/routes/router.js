const express = require('express');
const todo_func = require('../controller/todo_funcs');
const router = express.Router();

router.post('/', (req, res) => {
    console.log(`Added a new item to the list`);

    todo_func.create(req.body.title).then((data) => {
        res.redirect('/todo');
    });
});

router.get('/', (req, res) => {
    console.log(`Fetched all the items of the list`);

    todo_func.getAll().then((data) => {
        res.json(data);
    }).catch((err) => {
        console.error("Error occurred while fetching the list of TO DO ");
        console.error(err);
        res.json({
            'error': `Error occurred while fetching the list of TO DO `
        });
    });
});

router.get('/:id', (req, res) => {
    console.log(`Fetched an item with id: ${req.params.id}`);

    todo_func.get(req.params.id).then((data) => {
        res.json(data);
    }).catch((err) => {
        console.error(` Error occurred while fetching an item with id ${req.params.id}`);
        console.error(err);
        res.json({
            'error': `Error occurred while fetching an item with id ${req.params.id}`
        });
    });
});

router.put('/:id', (req, res) => {
    let object = {};

    let today = new Date();

    let date = (today.getDate() < 10 ? '0' : '') + today.getDate();
    let month = ((today.getMonth() + 1) < 10 ? '0' : '') + (today.getMonth() + 1);
    let todayDate = date + '/' + month + '/' + today.getFullYear();

    let hour = (today.getHours() < 10 ? '0' : '') + today.getHours();
    let min = (today.getMinutes() < 10 ? '0' : '') + today.getMinutes();
    let time = hour + ':' + min;

    object.time = time;
    object.date = todayDate;

    if (typeof req.body.title !== "undefined") {
        object.title = req.body.title;
        console.log(`Updated the title of an item with id: ${req.params.id}`);
    }

    if (typeof req.body.done !== "undefined") {
        object.done = req.body.done;
        console.log(`Updated the 'done' status of an item with id: ${req.params.id}`);
    }

    todo_func.update(req.params.id, object).then((data) => {
        res.redirect(303, '/todo/' + data.id);
    }).catch((err) => {
        console.error(` Error occurred while updating an item with id ${req.params.id}`);
        console.error(err);
        res.json({
            'error': `Error occurred while updating an item with id ${req.params.id}`
        });
    });
});

router.delete('/:id', (req, res) => {
    console.log(`Deleted an item with id: ${req.params.id}`);

    todo_func.remove(req.params.id).then(() => {
        res.send();
    }).catch((err) => {
        console.error(` Error occurred while deleting an item with id ${req.params.id}`);
        console.error(err);
        res.json({
            'error': `Error occurred while deleting an item with id ${req.params.id}`
        });
    });
});

module.exports = { router };