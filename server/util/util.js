/**
 * Sim, adiciona features interessantes do lodash e usa como módulo 'util'.
 */
let _ = require('lodash');

_.CONSTANTES_LOCAL = {
    URI: `${_.API_URI}/locais`,

    ERRO_VALIDACAO_NOME: 'Usuário deve ter um nome',
    ERRO_VALIDACAO_EMAIL: 'Usuário deve ter um email',
    ERRO_VALIDACAO_SENHA: 'Usuário deve ter uma senha',
    ERRO_VALIDACAO_USERNAME: 'Usuário deve ter um username',
    ERRO_VALIDACAO_DATA_NASCIMENTO: 'Usuário deve ter uma data de nascimento',    
    
};

/**
 * Lida com o erro de validação do mongoose.
 *
 * @param   {Object}   err  Objeto de erro mongoose.
 * @param   {Function} next Função callback para redirecionar para a próxima função.
 */
_.handleValidationError = (err, next) => {
    let message = 'Erro de validação: ';
    _.each(err.errors, (value, field) => {
        if (message.indexOf(': ') !== message.length - ': '.length)
            message += ', ';
        message += value.message;
    });
    message += ".";
    return next(new Error(message));
};


module.exports = _;