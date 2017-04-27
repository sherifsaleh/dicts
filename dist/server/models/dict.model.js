"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var dictSchema = new mongoose.Schema({
    name: String,
    dictSchema: [{ values: String }]
});
var Dict = mongoose.model('Dict', dictSchema);
exports.default = Dict;
//# sourceMappingURL=dict.model.js.map