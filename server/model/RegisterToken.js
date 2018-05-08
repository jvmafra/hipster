import mongoose from 'mongoose';
import * as erro from '../util/ErroHandler';
import { UsuarioService }  from '../service/UsuarioService';

const Schema = mongoose.Schema;

const self = this;

/**
 * Schema que representa o token de verificação de cadastro no banco de dados
 * validações adicionadas para manter a consistencia dos dados
 * que iremos guardar.
 */
const registerTokenSchema = new Schema({
  uuid : {
    type: String,
    required: [true],
    index: true,                                              // primary-key
    unique: [true]
  },

  ownerUsername : {
    type: String,
    required: [true]
  },

  creationDate : {
    type: Date,
    default: Date.now
  },

  expirationTime : {
    type: Number,
    required: [true]
  }
});

registerTokenSchema.pre("save", async function(next) {
  try {
      await UsuarioService.consultaUsuario(this.ownerUsername);
      next();
  } catch (err) {
      next(err);
  }

});

registerTokenSchema.post('save', (err, doc, next) => {
  if (err.name === 'ValidationError') {
    erro.handleValidationError(err, next);
  } else if (err.name === 'MongoError'){
    erro.handleMongoError(err, next);
  }
  return next(err);
});


module.exports = mongoose.model('RegisterToken', registerTokenSchema);
