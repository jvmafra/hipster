/**
 * Sim, adiciona features interessantes do lodash e usa como módulo 'util'.
 */
let _ = require('lodash');

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
    return next(new Error(message));
};


module.exports = _;