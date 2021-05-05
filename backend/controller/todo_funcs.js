const express = require('express');
const mongoose = require('mongoose');
const todoSchema = require('../model/db_schema');

const SchemaModel = mongoose.model(todoSchema.name);

function create(title) {
    let today = new Date();

    let date = (today.getDate() < 10 ? '0' : '') + today.getDate();
    let month = ((today.getMonth() + 1) < 10 ? '0' : '') + (today.getMonth() + 1);
    let todayDate = date + '/' + month + '/' + today.getFullYear();

    let hour = (today.getHours() < 10 ? '0' : '') + today.getHours();
    let min = (today.getMinutes() < 10 ? '0' : '') + today.getMinutes();
    let time = hour + ':' + min;

    const newTodo = new SchemaModel({ title: title, time: time, date: todayDate });
    return newTodo.save();
}

function getAll() {
    return SchemaModel.find({}).exec();
}

function get(id) {
    return SchemaModel.findById(id).exec();
}

function remove(id) {
    return SchemaModel.findByIdAndDelete(id).exec();
}

function update(id, object) {
    return SchemaModel.findByIdAndUpdate(id, object).exec();
}

module.exports = { create, getAll, get, remove, update };