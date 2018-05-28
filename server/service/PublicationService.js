import Publication from '../model/Publication'

const ORDER_BY_MOST_RECENT = 1;
const ORDER_BY_LESS_RECENT = 2;
const ORDER_BY_MOST_POPULAR = 3;
const ORDER_BY_LESS_POPULAR = 4;
const ASCENDING_ORDER = 1;
const DESCENDING_ORDER = -1;

/**
 * Service responsavel pela lógica de usuário
 *
 * @author Team Hipster
 */
export class PublicationService {


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
   * @returns {Promise}  Promise resolvida com uma lista de objetos Publication
   * da forma que o mongo retorna. Recebe uma query com informações sobre
   * ordenação e filtering.
   */
  static search(query) {
    let sortParams = getSortParams(query.orderBy);
    let findParams = getFindParams(query.filterByGenres, query.user);

    return Publication.find(findParams).sort(sortParams)
            .limit(7).skip(parseInt(query.skip)).exec();
  }


  /**
  * Consulta todos as Publicações dado um texto.
  *
  * @returns {Promise}  Promise resolvida com uma lista de objetos Publication
  * da forma que o mongo retorna. Recebe uma query com informações de busca textual.
  */
 static searchByText(query) {
   const findParams = getTextSearchParams(query.textSearch);

   return Publication.find(findParams)
           .limit(7).skip(parseInt(query.skip)).exec();
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

function getTextSearchParams(textSearch) {
  let find = {};

  if (textSearch) {
    find = { $text: { $search: textSearch } }
  }

  return find;

}

function getFindParams(filteredByGenreParam, userParam) {
  let find = {};

  if (userParam != "undefined") {
    find["ownerUsername"] = userParam;
  }

  if (filteredByGenreParam instanceof Array) {
    find["genres"] = { $in : filteredByGenreParam}
  } else if (filteredByGenreParam != undefined) {
    var auxArray = [];
    auxArray.push(filteredByGenreParam)
    find["genres"] = { $in : auxArray}
  }

  return find;
}

function getSortParams(orderByParam) {
  let sort = {};

  if (orderByParam == ORDER_BY_MOST_RECENT) {
    sort = { "creationDate": DESCENDING_ORDER };
  } if (orderByParam == ORDER_BY_LESS_RECENT) {
    sort = { "creationDate": ASCENDING_ORDER };
  } else if (orderByParam == ORDER_BY_MOST_POPULAR) {
    sort = { "likes": DESCENDING_ORDER };
  } else if (orderByParam == ORDER_BY_LESS_POPULAR) {
    sort = { "likes": ASCENDING_ORDER };
  }

  return sort;
}
