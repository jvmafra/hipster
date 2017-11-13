import db_config from '../config/db_config';
import Usuario from '../model/Usuario'

db_config();

/**
 * Service responsavel pela lógica de usuário
 *
 * @author Gustavo Oliveira
 */
export class UsuarioService {

  /**
   * Consulta um Usuário dado um email.
   *
   * @param   {String}  email do usuário no qual quer recuperar.
   * @returns {Promise}  Promise de consulta Usuario no banco de dados.
   */
  static consultaUsuario(email) {
    console.log(db_config());
    console.log(email);
  }

  static cadastraUsuario(usuario) {
    const usuarioMongoose = new Usuario(usuario);
    return  new Promise((resolve, reject) => {
      usuarioMongoose.save((err, result) => (err) ? reject(err.message) : resolve(result));
    })

  }
}
