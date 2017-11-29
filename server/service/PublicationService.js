import db_config from '../config/db_config';
import Publication from '../model/Publication'

db_config();

/**
 * Service responsavel pela lógica de usuário
 *
 * @author Gustavo Oliveira
 */
export class PublicationService{

  /**
   * Consulta uma Publicação dado um id.
   *
   * @param   {String}  id da publicação no qual quer recuperar.
   * @returns {Promise}  Promise resolvida com o objeto Publicação
   * da forma que o mongo retorna.
   */
  static retrievePublication(id) {
    return new Promise((resolve, reject) =>
      Publication.findOne({_id: id}, (err, result) => {
        if (err || !result) return reject(err);
        return resolve(result);
      })
    );
  }

   /**
   * Consulta todos as Publicações.
   *
   * @returns {Promise}  Promise resolvida com uma lista de objetos Usuario
   * da forma que o mongo retorna.
   */
  static retrievePublications() {
    return new Promise((resolve, reject) => {
      Publication.find({}, (err, results) => {
        if (err) return reject(err);
        return resolve(results);
      });
    });
  }

   /**
   * Consulta todos as Publicações de um usuário
   *
   * @returns {Promise}  Promise resolvida com uma lista de objetos Usuario
   * da forma que o mongo retorna.
   */
  static retrieveUserPublications(ownerUsername) {
    return new Promise((resolve, reject) => {
      Publication.find({ownerUsername: ownerUsername}, (err, results) => {
        if (err) return reject(err);
        return resolve(results);
      });
    });
  }


  /**
   * Remove uma Publicação
   *
   * @param   {String}  id referente a publicação a ser removido
   * @return  {Promise} Promise resolvida
   */
  static removePublication(id) {
    return new Promise((resolve, reject) =>
      Publication.findOneAndRemove({_id: id}, (err, result) => {
        if (err || !result) return reject(err);
        return resolve(result);
      })
    );
  }

  /**
   * Cadastra uma Publicação
   * 
   * @param   {Object}  publicacao contendo os campos preenchidos
   * @return  {Promise} Promise resolvida com o objeto Usuario
   * da forma que o mongo retorna
   */
  static registerPublication(publication) {
      const publicationMongoose = new Publication(publication);
      return  new Promise((resolve, reject) => {
        publicationMongoose.save((err, result) => (err) ? reject(err) : resolve(result))
      });
  }

  /**
   * Remove todas as Publicação
   *
   * @return  {Promise} Promise resolvida com o resultado da
   * remoção de todas as Publicações.
   */
  static removePublications() {
    return new Promise((resolve, reject) =>
      Publication.remove({}, (err, result) => {
        if (err || !result) return reject(err);
        return resolve(result);
      })
    );
  }
}
