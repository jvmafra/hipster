import mongoose from 'mongoose';
import * as erro from '../util/ErroHandler';
import bcrypt from 'bcrypt-nodejs'

const Schema = mongoose.Schema;

/**
 * @FIXME extrair esses metodos pra uma classe auxiliar
 */
const getExistentEntityErroMenssage = (entidade) => `${entidade} já existente`;

/**
 * Schema que representa o Usuario no banco de dados
 * validações adicionadas para manter a consistencia dos dados
 * que iremos guardar.
 *
 * @author Gustavo Oliveira
 */
const usuarioSchema = new Schema({
    name : {
      type: String,
      required: [true, erro.CADASTRO.VALIDACAO_NOME]
    },

    email : {
      type: String,
      required: [true, erro.CADASTRO.VALIDACAO_EMAIL]
    },

    password : {
      type: String,
      required: [true, erro.CADASTRO.VALIDACAO_SENHA]
    },

    username : {
      type: String,
      required:[true, erro.CADASTRO.VALIDACAO_USERNAME],

      index: true,                                              // primary-key

      unique: [true, getExistentEntityErroMenssage("username")]
    },

    birthDate : {
      type: Date,
      required: [true, erro.CADASTRO.VALIDACAO_DATA_NASCIMENTO]
    },

    youtubeURL : {
      type: String,
      required: [false]
    },

    spotifyURL : {
      type: String,
      required: [false]
    },

    active : {
      type: Boolean,
      default: false
    }
});

usuarioSchema.pre("save", function(next) {
  const user = this;
  if (!user.isModified("password")) {
    return next();
  }
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(user.password, salt, null, (err, hash) => {
      user.password = hash;
      next();
    });
  });
});

usuarioSchema.post('save', (err, doc, next) => {
  if (err.name === 'ValidationError') {
    erro.handleValidationError(err, next);
  } else if (err.name === 'MongoError'){
    erro.handleMongoError(err, next);
  }
  return next(err);
});

usuarioSchema.options.toJSON = {
  transform: (doc, ret) => {delete ret.senha;}
};

module.exports = mongoose.model('Usuario', usuarioSchema);
