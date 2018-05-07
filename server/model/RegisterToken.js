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
const RegisterToken = new Schema({
  uuid : {
    type: String,
    required: [true]
  },

  ownerUsername : {
    type: String,
    required: [true, erro.CADASTRO.VALIDACAO_OWNER]
  },

  creationDate : {
    type: Date,
    default: Date.now
  },

  expirationTime : {
    type: Number,
    required: [true, erro.CADASTRO.VALIDACAO_URL_YOUTUBE]
  }
});

publicationSchema.pre("save", async function(next) {
  let usuario = {};
  try {
      usuario = await UsuarioService.consultaUsuario(this.ownerUsername);
      next();
  } catch (err) {
      next(err);
  }

});

publicationSchema.post('save', (err, doc, next) => {
  if (err.name === 'ValidationError') {
    erro.handleValidationError(err, next);
  } else if (err.name === 'MongoError'){
    erro.handleMongoError(err, next);
  }
  return next(err);
});


module.exports = mongoose.model('RegisterToken', publicationSchema);
