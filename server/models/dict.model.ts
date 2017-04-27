import * as mongoose from 'mongoose';

const dictSchema = new mongoose.Schema({
  name: String,
  dictSchema: [{ values: String }]
});

const Dict = mongoose.model('Dict', dictSchema);

export default Dict;
