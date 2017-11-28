import mongoose from 'mongoose';
import * as erro from '../util/ErroHandler';
import { UsuarioService }  from '../service/UsuarioService';

const Schema = mongoose.Schema;

const self = this;

/**
 * Schema que representa o Usuario no banco de dados
 * validações adicionadas para manter a consistencia dos dados
 * que iremos guardar.
 *
 * @author Gustavo Oliveira
 */
const publicationSchema = new Schema({
  ownerUsername : {
    type: String,
    required: [true, erro.CADASTRO.VALIDACAO_OWNER]
  },

  url : {
    type: String,
    required: [true, erro.CADASTRO.VALIDACAO_URL]
  },

  description : String,
  
  creationDate : { 
    type: Date, 
    default: Date.now },

  genres : [String],

  aproves : [String]

  
});

publicationSchema.pre("save", async function(next) {  
  next();
  
});

publicationSchema.post('save', (err, doc, next) => {
  if (err.name === 'ValidationError') {
    erro.handleValidationError(err, next);
  } else if (err.name === 'MongoError'){
    erro.handleMongoError(err, next);
  }
  return next(err);
});


module.exports = mongoose.model('Publication', publicationSchema);
