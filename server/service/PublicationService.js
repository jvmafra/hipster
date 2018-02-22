import db_config from '../config/db_config';
import Publication from '../model/Publication'

db_config();

/**
 * Service responsavel pela lógica de usuário
 *
 * @author Team Hipster
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
    return Publication.findOne({_id: id}).exec();
  }

   /**
   * Consulta todos as Publicações.
   *
   * @returns {Promise}  Promise resolvida com uma lista de objetos Usuario
   * da forma que o mongo retorna.
   */
  static retrievePublications() {
    return Publication.find({}).sort({creationDate: -1}).exec();
  }

   /**
   * Consulta todos as Publicações de um usuário
   *
   * @returns {Promise}  Promise resolvida com uma lista de objetos Usuario
   * da forma que o mongo retorna.
   */
  static retrieveUserPublications(ownerUsername) {
    return Publication.find({ownerUsername: ownerUsername}).sort({creationDate: 1}).exec();
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
    return publicationMongoose.save();
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


  static editPublication(id, updatedPublication){
    return new Promise((resolve, reject) =>
    Publication.findOneAndUpdate({_id: id}, updatedPublication, (err, result) => {
      if (err) return reject(err);
      if (!result) return reject(new Error("Operação não permitida"));
      return resolve(result);
    })
  );
  }
}
