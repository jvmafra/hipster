import mongoose from 'mongoose';
import * as erro from '../util/ErroHandler';

const Schema = mongoose.Schema;

const self = this;

const schedulerSchema = new Schema({
  creationDate : {
    type: Date,
    default: Date.now },

  numberOfDeletes : Number,

});

schedulerSchema.post('save', (err, doc, next) => {
  if (err.name === 'ValidationError') {
    erro.handleValidationError(err, next);
  } else if (err.name === 'MongoError'){
    erro.handleMongoError(err, next);
  }
  return next(err);
});


module.exports = mongoose.model('Scheduler', schedulerSchema);
