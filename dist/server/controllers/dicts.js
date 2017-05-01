"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var dict_model_1 = require('../models/dict.model');
var base_1 = require('./base');
var DictsCtrl = (function (_super) {
    __extends(DictsCtrl, _super);
    function DictsCtrl() {
        _super.apply(this, arguments);
        this.model = dict_model_1["default"];
    }
    return DictsCtrl;
}(base_1["default"]));
exports.__esModule = true;
exports["default"] = DictsCtrl;
