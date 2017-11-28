import db_config from '../config/db_config';
import Publicacao from '../model/Publicacao'

db_config();

/**
 * Service responsavel pela lógica de usuário
 *
 * @author Gustavo Oliveira
 */
export class PublicacaoService{

  /**
   * Consulta uma Publicação dado um id.
   *
   * @param   {String}  id da publicação no qual quer recuperar.
   * @returns {Promise}  Promise resolvida com o objeto Publicação
   * da forma que o mongo retorna.
   */
  static consultaPublicacoes(id) {
    return new Promise((resolve, reject) =>
      Publicacao.findOne({_id: id}, (err, result) => {
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
  static consultaPublicacao() {
    return new Promise((resolve, reject) => {
      Publicacao.find({}, (err, results) => {
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
  static removePublicacao(id) {
    return new Promise((resolve, reject) =>
      Publicacao.findOneAndRemove({_id: id}, (err, result) => {
        if (err || !result) return reject(err);
        return resolve(result);
      })
    );
  }

  /**
   * Cadastra um Usuario
   *
   * @param   {Object}  publicacao contendo os campos preenchidos
   * @return  {Promise} Promise resolvida com o objeto Usuario
   * da forma que o mongo retorna
   */
  static registraPublicacao(publicacao) {
      const publicacaoMongoose = new Publicacao(publicacao);
      return  new Promise((resolve, reject) => {
        publicacaoMongoose.save((err, result) => (err) ? reject(err) : resolve(result))
      });
  }

  /**
   * Remove todas as Publicação
   *
   * @return  {Promise} Promise resolvida com o resultado da
   * remoção de todas as Publicações.
   */
  static removePublicacao() {
    return new Promise((resolve, reject) =>
      Publicacao.remove({}, (err, result) => {
        if (err || !result) return reject(err);
        return resolve(result);
      })
    );
  }
}
