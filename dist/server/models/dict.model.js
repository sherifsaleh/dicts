"use strict";
var mongoose = require('mongoose');
var dictSchema = new mongoose.Schema({
    name: String
});
var Dict = mongoose.model('Dict', dictSchema);
exports.__esModule = true;
exports["default"] = Dict;
