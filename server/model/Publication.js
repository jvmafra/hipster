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

  videoID : {
    type: String,
    required: [true, erro.CADASTRO.VALIDACAO_VIDEOID_YOUTUBE]
  },

  title : {
    type: String,
    required: [true, erro.CADASTRO.VALIDACAO_TITLE]
  },

  description : String,

  creationDate : {
    type: Date,
    default: Date.now
  },

  genres : [String],

  likes : [String],

  artist : String,

  year : Number,

  comments : [
    {
      ownerUsername : {
        type: String,
        required: [true, erro.COMMENT.VALIDACAO_OWNER]
      },

      description : {
        type: String,
        required: [true, erro.COMMENT.VALIDACAO_COMMENT]
      },

      creationDate : {
        type: Date,
        default: Date.now
      },

      likes : [String],
    }
  ],

});

publicationSchema.pre("save", async function(next) {
  let usuario = {}
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

var Publication = mongoose.model('Publication', publicationSchema);

Publication.collection.dropIndexes();

Publication.collection.createIndex(
  {
   videoID: "text",
   ownerUsername: "text",
   artist: "text",
   title: "text"
  },
  {
    weights: {
      videoID: 5,
      ownerUsername: 8,
      artist: 8,
      title: 10
    }
  }
);

module.exports = Publication;
