import Publication from '../model/Publication'
import token from './tokenService';


const ORDER_BY_MOST_RECENT = 1;
const ORDER_BY_LESS_RECENT = 2;
const ORDER_BY_MOST_POPULAR = 3;
const ORDER_BY_LESS_POPULAR = 4;
const ASCENDING_ORDER = 1;
const DESCENDING_ORDER = -1;
const PROJECT_QUERY = { "$project": {_id: 1, videoID: 1, ownerUsername: 1, description: 1, url: 1,
                        likes: 1, title : 1, genres: 1, artist: 1, creationDate: 1, comments: 1}};

const UNWIND_QUERY = { "$unwind": {"path": "$comments", "preserveNullAndEmptyArrays": true}};
const GROUP_QUERY =     {"$group": {"_id": "$_id", "url": {"$first": "$url"}, "videoID": {"$first": "$videoID"},
        "ownerUsername": {"$first": "$ownerUsername"}, "description": {"$first": "$description"}, "artist": {"$first": "$artist"},
        "genres": {"$first": "$genres"}, "title": {"$first": "$title"}, "creationDate": {"$first": "$creationDate"},
        "likes": {"$first": "$likes"}, "comments": {"$push": "$comments"}, "user_photos": {"$push": "$user_photos.photoUrl"}}};

const SORT_COMMENT_QUERY =  {"$sort": {"orderByUser": -1, "number_likes": -1, }};
const lookup = {"$lookup":{from: "usuarios", localField: "comments.ownerUsername", foreignField: "username",
                as: "user_photos"}};
/**
 * Service responsavel pela lógica de usuário
 *
 * @author Team Hipster
 */
export class PublicationService {


  /**
   * Consulta uma Publicação dado um id e retorna ela com os comentários ordenados da forma
   * que os comentários do usuário logado apareçam primeiro
   *
   * @param   {String}  id da publicação no qual quer recuperar.
   * @param {Object} query
   * query.user: O usuário que fez a pesquisa
   * @returns {Promise}  Promise resolvida com o objeto Publicação
   * da forma que o mongo retorna.
   */
  static retrievePublication(id, query) {
    var ObjectID = require("mongodb").ObjectID;
    let projectQuery = setConditionQuery(query.user);
    let findParams = {"$match": {_id: ObjectID(id)}};

    return Publication.aggregate([
      UNWIND_QUERY, projectQuery, SORT_COMMENT_QUERY, GROUP_QUERY, findParams
      ]).exec()
  }

   /**
   * Consulta todos as Publicações. Neste método é feito todo o search inicial de publicações do sistema.
   * Ordenando as publicações de acordo com a query pesquisada.
   *
   * @param {Object} query.
   * query.skip: Serve para a paginação da search. Ele pula um certo número de objetos. Ou seja, se query.skip
   * for igual a 10, a pesquisa pulará os primerios 10 elementos da pesquisa.
   * query.user: O usuário. Que pode ser o usuário logado ou o usuário do perfil que o usuário
   * logado está usando.
   * query.orderBy: O tipo de ordenação que as publicações devem estar(ORDER_BY_MOST_RECENT,
   * ORDER_BY_MOST_POPULAR, ORDER_BY_LESS_POPULAR)
   * query.filterByGenres: Lista de generos filtrados pelo usuário
   *
   * @returns {Promise}  Promise resolvida com uma lista de objetos Usuario
   * da forma que o mongo retorna. Recebe uma query com informações sobre
   * ordenação e filtering.
   */
  static async search(query, username) {
    //Faz com os comentários do usuário logado apareçam primeiro
    let projectQuery = setConditionQuery(username);
    let skip =  {"$skip": parseInt(query.skip)}
    let limit = {"$limit": 10}
    let findParams = {};
    let sortParams = {};

    if(!query.orderBy) {
      /** When user is accessing his homepage or someone else home page, query.user is equal 
       * to the username of the profile which is being visited by the 
       * user authenticated
       */
      findParams = {"$match": {"ownerUsername": query.user}};
      sortParams = {"$sort": {"creationDate": DESCENDING_ORDER}};
    } else {
      //When user is visiting general timeline
      sortParams = getSortParams(query.orderBy);
      findParams = getFindParams(query.filterByGenres, query.user);
    }
  
    return Publication.aggregate([
      UNWIND_QUERY, projectQuery, SORT_COMMENT_QUERY, lookup, GROUP_QUERY, findParams, sortParams, skip, limit
      ]).exec()
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
  static registerPublication(publication, username) {
    publication["ownerUsername"] = username;
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
  let find = {"$match": {}};

  if (filteredByGenreParam instanceof Array) {
    find["$match"]["genres"] = { $in : filteredByGenreParam}
  } else if (filteredByGenreParam != undefined) {
    var auxArray = [];
    auxArray.push(filteredByGenreParam)
    find["$match"]["genres"] = { $in : auxArray}
  }

  return find;
}

 /**
   * Serve basicamente para que os comentários do usuário(logado) apareçam no topo. Basicamente
   * a ideia é se o comentário for do usuário, tem peso 1. Se não, peso 0. Além disso, projeta
   * o número de likes. Assim, como ordenação secundária, teremos o número de likes
   *
   * @return  {Object} Objeto necessário para fazer a projeção na minha pesquisa
   */
function setConditionQuery(userParam) {
  let projectQuery = PROJECT_QUERY;

  projectQuery["$project"]["orderByUser"] = {$cond: { if: { $eq: [ "$comments.ownerUsername", userParam ] }, then: 1, else: 0 }}
  projectQuery["$project"]["number_likes"] = {$size: { "$ifNull": [ "$comments.likes", [] ]}}

  return projectQuery;
}

function getSortParams(orderByParam) {
  let sort = {};

  if (orderByParam == ORDER_BY_MOST_RECENT) {
    sort["$sort"] = {};
    sort["$sort"]["creationDate"] = DESCENDING_ORDER;
  } else if (orderByParam == ORDER_BY_MOST_POPULAR) {
    sort["$sort"] = {};
    sort["$sort"]["likes"] = DESCENDING_ORDER;
  } else if (orderByParam == ORDER_BY_LESS_POPULAR) {
    sort["$sort"] = {};
    sort["$sort"]["likes"] = ASCENDING_ORDER;
  }

  return sort;
}
