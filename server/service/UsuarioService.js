import db_config from '../config/db_config';
import Usuario from '../model/Usuario';
import bcrypt from 'bcrypt-nodejs';
import uuid3 from 'uuid/v3';
import { NAMESPACE } from "../../server";
import { EmailService } from './EmailService';
import { ConfirmationService } from "./ConfirmationService";

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
  * Consulta todos os Usuários dado um texto.
  *
  * @returns {Promise}  Promise resolvida com uma lista de objetos Usuario
  * da forma que o mongo retorna. Recebe uma query com informações de busca textual.
  */
   static searchByText(query) {
     const findParams = getTextSearchParams(query.textSearch);

     return Usuario.find(findParams, { "password" : 0 })
             .limit(7).skip(parseInt(query.skip)).exec();
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
      Usuario.findOne({ username: username, active: true }, (err, result) => {
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
          const to = {nome: result.name, email:result.email};
          const token = uuid3(result.username,NAMESPACE);
          const registrationToken = {uuid : token, ownerUsername : result.username, expirationTime : 1};

          ConfirmationService.createRegisterToken(registrationToken);

          EmailService.sendRegistrationMail(token, to);
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
   * Update o filePhotoName e a photoUrl de um Usuario
   *
   * @param   {username}  username do usuário que vai ser feito o update
   * @param   {filePhotoName}  É o nome do file(foto) que está salvo no firebase
   * @param   {photoUrl}  É a url necessário para acessar o file(foto) que está salva no firebase
   * @return  {Promise} Promise própria do mongoose
   */
  static updatePhotoInfo(username, filePhotoName, photoUrl) {
    return Usuario.update({ username: username },{username: username, filePhotoName: filePhotoName, 
                            photoUrl: photoUrl},{ upsert: true }).exec();
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

  /**
   * Recupera lista de usuarios ativos a partir de um email
   *
   * @returns {Promise}  Promise resolvida com uma lista de objetos Usuario
   */
  static retrieveActivedUserByEmail(email) {
    return Usuario.find({email: email, active: true}).exec();
  }
}

function getTextSearchParams(textSearch) {
  let find = {};

  if (textSearch) {
    find = { $text: { $search: textSearch } }
  }

  return find;

}
