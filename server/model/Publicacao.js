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
const publicacaoSchema = new Schema({
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

  aproves : [String],

  
});

publicacaoSchema.pre("save", async function(next) {
  this.dataCriacao = this._id.getTimestamp().getTime();  

  let usuario = {}
  try {
    usuario = await UsuarioService.consultaUsuario(this.ownerUsername);
  } catch (err) {
    next(err);
  }

  const usuarioObject = prepareUserToBeUpdated(usuario);
  const publicacaoObject = handleSavePublicacaoUsuario(this);

  usuarioObject.publicacoes.push(publicacaoObject);
  try {
    await UsuarioService.editaUsuario(this.ownerUsername, usuarioObject);
    next();
  } catch(err) {
    next(err);
  }

});

publicacaoSchema.post('save', (err, doc, next) => {
  if (err.name === 'ValidationError') {
    erro.handleValidationError(err, next);
  } else if (err.name === 'MongoError'){
    erro.handleMongoError(err, next);
  }
  return next(err);
});


/**
 * Transforma o {MongoObject} recebido, referente a um
 * Usuário, em um {Object} e prepara para ser atualizado.
 *
 * @param usuario         {MongoObject} referente ao usuário consultado.
 * @return {Object}       Usuário após ser preparado.
 */
 const prepareUserToBeUpdated = (usuario) =>{
  const usuarioObject = usuario.toObject();
  delete usuarioObject.__v;
  delete usuarioObject._id;
  return usuarioObject;
};

/**
 * Transforma o {MongoObject} recebido, referente a uma
 * Publicação, em um {Object} e prepara para ser salvo no
 * Usuário.
 *
 * @param publicacao      {MongoObject} referente a publicação cadastrada.
 * @return {Object}       Usuário após ser preparado.
 */
const handleSavePublicacaoUsuario = (publicacao) => {
  const publicacaoObject = publicacao.toObject();
  delete publicacaoObject.__v;
  delete publicacaoObject.ownerUsername;
  return publicacaoObject;
};

module.exports = mongoose.model('Publicacao', publicacaoSchema);
