import * as express from 'express';

import DictsCtrl from './controllers/dicts';
import Cat from './models/dict.model';

export default function setRoutes(app) {

  const dicts = new DictsCtrl();

  // APIs
  app.route('/api/dicts').get(dicts.getAll);
  app.route('/api/dict/count').get(dicts.count);
  app.route('/api/schemas').get(dicts.getSchemas);
  app.route('/api/dict').post(dicts.insert);
  app.route('/api/dict/:id').get(dicts.get);
  app.route('/api/dict/:id').put(dicts.update);
  app.route('/api/dict/:id').delete(dicts.delete);

}
