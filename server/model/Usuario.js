import mongoose from 'mongoose';

const Schema = mongoose.Schema;


const usuarioSchema = new Schema({
    nome : {
      type: String,
      required: [true, "Usuário deve ter um nome."]
    },

    email : {
      type: String,
      required: [true, "Usuário deve ter um e-mail."]
    },

    senha : {
      type: String,
      required: [true, "Todo usuário deve ter uma senha."]
    },

    dataNascimento : {
      type: String,
      required: [true, "Todo usuário deve ter uma senha."]
    }
});

usuarioSchema.post('save', (err, doc, next) => {
  return next(err);
});

module.exports = mongoose.model('Usuario', usuarioSchema);
