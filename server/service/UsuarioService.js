import db_config from '../config/db_config';
import Usuario from '../model/Usuario'
import bcrypt from 'bcrypt-nodejs'

db_config();

/**
 * Service responsavel pela lógica de usuário
 *
 * @author Gustavo Oliveira
 */
export class UsuarioService {

  /**
   * Consulta um Usuário dado um username.
   *
   * @param   {String}  username do usuário no qual quer recuperar.
   * @returns {Promise}  Promise resolvida com o objeto Usuario
   * da forma que o mongo retorna.
   */
  static consultaUsuario(username) {
    return new Promise((resolve, reject) =>
      Usuario.findOne({username: username}, (err, result) => {
        if (err || !result) return reject(err);
        return resolve(result);
      })
    );
  }

  /**
   * Autentica um Usuário dado um username e password.
   *
   * @param   {String}  username do usuário no qual quer autenticar.
   * @param   {String}  password do usuário no qual quer autenticar.
   * @returns {Promise}  Promise resolvida com o objeto Usuario
   * da forma que o mongo retorna.
   */
  static autenticaUsuario(username, password) {
    return new Promise((resolve, reject) =>
      Usuario.findOne({ username: username }, (err, result) => {
        if (err || !result) {
          return resolve(err);
        } else {
          bcrypt.compare(password, result.password, function(err, res) {
            if (res) {
              return resolve(result);
            } else {
              return resolve(err);
            }
          });
        }
      })
    );
  }

  /**
   * Consulta todos os Usuários dado um email.
   *
   *
   * @returns {Promise}  Promise resolvida com uma lista de objetos Usuario
   * da forma que o mongo retorna.
   */
  static consultaUsuarios() {
    return new Promise((resolve, reject) => {
      Usuario.find({}, (err, results) => {
        if (err) return reject(err);
        return resolve(results);
      });
    });
  }


  /**
   * Cadastra um Usuario
   *
   * @param   {Object}  usuario contendo os campos preenchidos
   * @return  {Promise} Promise resolvida com o objeto Usuario
   * da forma que o mongo retorna
   */
  static registerUser(usuario) {
    const usuarioMongoose = new Usuario(usuario);
    return  new Promise((resolve, reject) => {
      usuarioMongoose.save((err, result) => (err) ? reject(err) : resolve(result));
    })

  }

  /**
   * Edita um Usuario
   *
   * @param   {Object}  novo usuario contendo os campos preenchidos
   * @return  {Promise} Promise resolvida com o objeto Usuario
   * da forma que o mongo retorna
   */

  static editaUsuario(username, novoUsuario) {
    return new Promise((resolve, reject) =>
      Usuario.findOneAndUpdate({username: username}, novoUsuario, (err, result) => {
        if (err || !result) return reject(err);
        return resolve(result);
      })
    );

  }



}
