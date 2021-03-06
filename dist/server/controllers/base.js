"use strict";
var BaseCtrl = (function () {
    function BaseCtrl() {
        var _this = this;
        // Get all
        this.getAll = function (req, res) {
            _this.model.find({}, null, { sort: { date: -1 } }, function (err, docs) {
                if (err) {
                    return console.error(err);
                }
                res.json(docs);
            });
        };
        // Count all
        this.count = function (req, res) {
            _this.model.count(function (err, count) {
                if (err) {
                    return console.error(err);
                }
                res.json(count);
            });
        };
        // Insert
        this.insert = function (req, res) {
            var obj = new _this.model(req.body);
            obj.save(function (err, item) {
                if (err) {
                    return console.error(err);
                }
                res.status(200).json(item);
            });
        };
        // Get by id
        this.get = function (req, res) {
            _this.model.findOne({ _id: req.params.id }, function (err, obj) {
                if (err) {
                    return console.error(err);
                }
                res.json(obj);
            });
        };
        this.getSchemasNames = function (req, res) {
            // this.model.find({}, 'schemaMatching', { sort: { date: -1 } }, (err, docs) => {
            //   if (err) { return console.error(err); }
            //   res.json(docs);
            // });
            _this.model.find().distinct('schemaMatching', function (err, docs) {
                if (err) {
                    return console.error(err);
                }
                res.json(docs);
            });
        };
        this.getSchemas = function (req, res) {
            _this.model.find({}, 'dictSchema', { sort: { date: -1 } }, function (err, docs) {
                if (err) {
                    return console.error(err);
                }
                res.json(docs);
            });
        };
        // Update by id
        this.update = function (req, res) {
            _this.model.findOneAndUpdate({ _id: req.params.id }, req.body, function (err) {
                if (err) {
                    return console.error(err);
                }
                res.sendStatus(200);
            });
        };
        // Delete by id
        this.delete = function (req, res) {
            _this.model.findOneAndRemove({ _id: req.params.id }, function (err) {
                if (err) {
                    return console.error(err);
                }
                res.sendStatus(200);
            });
        };
    }
    return BaseCtrl;
}());
exports.__esModule = true;
exports["default"] = BaseCtrl;
