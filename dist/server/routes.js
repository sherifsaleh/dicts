"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dicts_1 = require("./controllers/dicts");
function setRoutes(app) {
    var dicts = new dicts_1.default();
    // APIs
    app.route('/api/dicts').get(dicts.getAll);
    app.route('/api/dict/count').get(dicts.count);
    app.route('/api/schemas').get(dicts.getSchemas);
    app.route('/api/dict').post(dicts.insert);
    app.route('/api/dict/:id').get(dicts.get);
    app.route('/api/dict/:id').put(dicts.update);
    app.route('/api/dict/:id').delete(dicts.delete);
}
exports.default = setRoutes;
//# sourceMappingURL=routes.js.map