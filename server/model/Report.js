import mongoose from 'mongoose';
import * as erro from '../util/ErroHandler';
import { UsuarioService }  from '../service/UsuarioService';

const Schema = mongoose.Schema;

const reportSchema = new Schema({

    ownerUsername : {
        type: String,
        required: [true, erro.REPORT.VALIDACAO_OWNER]
      },

    reportedUser : {
        type: String,
        required: [true, erro.REPORT.VALIDACAO_OWNER]
    },

    videoIDreported : {
        type: String        
    },

    description : {
        type: String,
        required: [true]

    },

    reportDate : {
      type: Date,
      default: Date.now },
    
});

reportSchema.pre("save", async function(next) {
    let ownerUsernameCheck = {}
    try {
        ownerUsernameCheck = await UsuarioService.consultaUsuario(this.ownerUsername);        
    } catch (err) {
        next(err);
    }

    let reportedUserCheck = {}
    try {
        reportedUserCheck = await UsuarioService.consultaUsuario(this.reportedUser);
        next();
    } catch (err) {
        next(err);
    }

});

reportSchema.post('save', (err, doc, next) => {
    if (err.name === 'ValidationError') {
      erro.handleValidationError(err, next);
    } else if (err.name === 'MongoError'){
      erro.handleMongoError(err, next);
    }
    return next(err);
});

module.exports = mongoose.model('Report', reportSchema);