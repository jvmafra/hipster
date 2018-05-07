import db_config from '../config/db_config';
import Usuario from '../model/Usuario';
import bcrypt from 'bcrypt-nodejs';
import uuid3 from 'uuid/v3';
import {NAMESPACE} from "../../server";
import { EmailService } from './EmailService';

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
        if (err) return reject(err);
        if (!result) return reject(new Error("Username não cadastrado."));
        return resolve(result);
      })
    );
  }

  /**
   * Auth and user by passing username and password.
   *
   * @param   {String}  username from the user who needs to auth.
   * @param   {String}  password from the user who needs to auth.
   * @returns {Promise} Promise resolved with the user object as like mongo returns.
   */
  static authUser(username, password) {
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
      usuarioMongoose.save((err, result) => {
        if (err) {
          return reject(err);
        }
        else {
          console.log(JSON.stringify(result, null, 2));
          const to = {nome: result.name, email:result.email};
          const token = uuid3(result.username,NAMESPACE);
          EmailService.sendRegistrationMail(result._id, to);
          return resolve(result)
        }
      });
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
        if (err) return reject(err);
        if (!result) return reject(new Error("Operação não permitida"));
        return resolve(result);
      })
    );

  }

  /**
   * Remove um Usuario
   *
   * @param   {username}  username do usuário a ser removido
   * @return  {Promise} Promise resolvida com o objeto Usuario
   * da forma que o mongo retorna
   */
  static removeUsuario(username) {
    return new Promise((resolve, reject) =>
      Usuario.findOneAndRemove({username: username}, (err, result) => {
        if (err || !result) return reject(err);
        return resolve(result);
      })
    );
  }
}
