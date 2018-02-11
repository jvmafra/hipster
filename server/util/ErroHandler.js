/**
 * Adiciona features interessantes do lodash '.
 */
let _ = require('lodash');

_.CADASTRO = {
    URI: `${_.API_URI}/locais`,

    VALIDACAO_NOME: 'Usuário deve ter um nome',
    VALIDACAO_EMAIL: 'Usuário deve ter um email',
    VALIDACAO_EMAIL_FORMATO: 'O email nao é valido',
    VALIDACAO_SENHA: 'Usuário deve ter uma senha',
    VALIDACAO_SENHA_TAMANHO: 'A senha deve ter no mínimo 8 caracteres',
    VALIDACAO_USERNAME: 'Usuário deve ter um username',
    VALIDACAO_DATA_NASCIMENTO_FORMATO: 'A data não é valida',
    VALIDACAO_DATA_NASCIMENTO: 'Usuário deve ter uma data de nascimento',

    VALIDACAO_OWNER: "Publicação deve ter um criador",
    VALIDACAO_URL: "Publicação deve ter uma url vinculada a ela",
    VALIDACAO_TITLE: "Publicação deve ter um título"
};

_.REQUISICAO = {
    ERRO_VALIDACAO: 'Erro de validação: ',
    ERRO_CRIACAO: 'Erro de criação: '
};

_.PUBLICATION = {
  VALIDACAO_OWNER: "VALIDACAO_OWNER",
  VALIDACAO_URL: "VALIDACAO_OWNER",
  VALIDACAO_TITLE: "VALIDACAO_TITLE",
  VALIDACAO_GENRES: "VALIDACAO_GENRES",
  VALIDACAO_CATEGORY: "VALIDACAO_CATEGORY",
  VALIDACAO_URL_YOUTUBE: "VALIDACAO_URL_YOUTUBE",
  VALIDACAO_VIDEOID_YOUTUBE: "VALIDACAO_URL_VIDEOID",
  VALIDACAO_YEAR: "O ano precisa ser um inteiro válido",
  VALIDACAO_VIEW_COUNT: "VALIDACAO_VIEW_COUNT"
}

const INFO_DUPLICADA = {
    USERNAME: 'Esse username já existe',
    EMAIL: 'Esse e-mail já foi cadastrado'
};


/**
 * Lida com o erro de validação do mongoose.
 *
 * @param   {Object}   err  Objeto de erro mongoose.
 * @param   {Function} next Função callback para redirecionar para a próxima função.
 */
_.handleValidationError = (err, next) => {
    let message = _.REQUISICAO.ERRO_VALIDACAO;
    _.each(err.errors, (value, field) => {
        if (message.indexOf(': ') !== message.length - ': '.length) {
            message += ', ';
        }
        message += value.message;
    });
    message += ".";
    return next(new Error(message));
};

_.handleMongoError = (err, next) => {
    let message = _.REQUISICAO.ERRO_CRIACAO;
    if (err.code === 11000) { // duplicate key error
        message += INFO_DUPLICADA.USERNAME;
    }
    message += ".";
    return next(new Error(message));
};

module.exports = _;
