import mongoose from 'mongoose';
import util from '../util/util';


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
    nome : {
      type: String,
      required: [true, util.CONSTANTES_LOCAL.ERRO_VALIDACAO_NOME]
    },

    email : {
      type: String,
      required: [true, util.CONSTANTES_LOCAL.ERRO_VALIDACAO_EMAIL]
    },

    senha : {
      type: String,
      required: [true, util.CONSTANTES_LOCAL.ERRO_VALIDACAO_SENHA]
    },

    username : {
      type: String,
      required:[true, util.CONSTANTES_LOCAL.ERRO_VALIDACAO_USERNAME],
      index: true,                                              // indexa pra facilitar na busca
      unique: [true, getExistentEntityErroMenssage("username")] // para garantir que é o indíce é unico
    },

    dataNascimento : {
      type: String,
      required: [true, util.CONSTANTES_LOCAL.ERRO_VALIDACAO_DATA_NASCIMENTO]
    }
});

usuarioSchema.post('save', (err, doc, next) => {
  if (err.name === 'ValidationError') {
    util.handleValidationError(err, next);
  } else if (err.name === 'MongoError'){
    util.handleMongoError(err, next);
  }
  return next(err);
});

module.exports = mongoose.model('Usuario', usuarioSchema);
