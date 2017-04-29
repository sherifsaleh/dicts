import * as mongoose from 'mongoose';

const dictSchema = new mongoose.Schema({
  name: String,
  description: String,
  dictSchema: [],
  schemaMatching: String,
  state: String,
  date: { type: Date, default: Date.now }
});

const Dict = mongoose.model('Dict', dictSchema);

export default Dict;
