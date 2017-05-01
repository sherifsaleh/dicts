"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var dictSchema = new mongoose.Schema({
    name: String,
    description: String,
    dictSchema: [],
    schemaMatching: String,
    state: String,
    validation: Boolean,
    date: { type: Date, default: Date.now }
});
var Dict = mongoose.model('Dict', dictSchema);
exports.default = Dict;
//# sourceMappingURL=dict.model.js.map