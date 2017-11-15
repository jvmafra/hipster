import mongoose from 'mongoose';

const Schema = mongoose.Schema;

/**
 * @FIXME extrair esses metodos pra uma classe auxiliar
 */
const getMustHaveErroMenssage = (entidade) => `Usuário deve ter um ${entidade}.`;
const getExistentEntityErroMenssage = (entidade) => `${entidade} já existente.`;

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
      required: [true, getMustHaveErroMenssage("nome")]
    },

    email : {
      type: String,
      required: [true, getMustHaveErroMenssage("email")]
    },

    senha : {
      type: String,
      required: [true, getMustHaveErroMenssage("nome")]
    },

    username : {
      type: String,
      required:[true, getMustHaveErroMenssage("username")],
      index: true,                                              // indexa pra facilitar na busca
      unique: [true, getExistentEntityErroMenssage("username")] // para garantir que é o indíce é unico
    },

    dataNascimento : {
      type: String,
      required: [true, getMustHaveErroMenssage("data de nascimento")]
    }
});

usuarioSchema.post('save', (err, doc, next) => {
  return next(err);
});

module.exports = mongoose.model('Usuario', usuarioSchema);
