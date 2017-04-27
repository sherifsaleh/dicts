import * as mongoose from 'mongoose';

const dictSchema = new mongoose.Schema({
  name: String
});

const Dict = mongoose.model('Dict', dictSchema);

export default Dict;
