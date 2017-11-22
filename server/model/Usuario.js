import mongoose from 'mongoose';
import * as erro from '../util/ErroHandler';
import crypt from 'crypto';
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
      index: true,                                              // "chave-primária" pra facilitar na busca
      unique: [true, getExistentEntityErroMenssage("username")]
    },

    birthDate : {
      type: Date,
      required: [true, erro.CADASTRO.VALIDACAO_DATA_NASCIMENTO]
    }
});

usuarioSchema.methods.compareHashPassword = function(callback) {
  var hashPassword = this.password;
  bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, null, (err, hash) => {
        hashPassword = hash;
      });
  });

  console.log(this.password);
  console.log(hashPassword);

  return this.model('Usuario').find({ password: this.password, username: this.username }, callback);
};

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
  transform: (doc, ret) => {delete ret.password;}
};

module.exports = mongoose.model('Usuario', usuarioSchema);
