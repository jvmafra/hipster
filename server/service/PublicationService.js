import Publication from '../model/Publication'


const ORDER_BY_MOST_RECENT = 1;
const ORDER_BY_MOST_POPULAR = 2;
const ORDER_BY_LESS_POPULAR = 3;
const ASCENDING_ORDER = 1;
const DESCENDING_ORDER = -1;
const PROJECT_QUERY = { "$project": {_id: 1, videoID: 1, ownerUsername: 1, description: 1, url: 1,
                        likes: 1, title : 1, genres: 1, artist: 1, creationDate: 1, comments: 1}};

const UNWIND_QUERY = { "$unwind": {"path": "$comments", "preserveNullAndEmptyArrays": true}};
const GROUP_QUERY =     {"$group": {"_id": "$_id", "url": {"$first": "$url"}, "videoID": {"$first": "$videoID"},
        "ownerUsername": {"$first": "$ownerUsername"}, "description": {"$first": "$description"}, "artist": {"$first": "$artist"},
        "genres": {"$first": "$genres"}, "title": {"$first": "$title"}, "creationDate": {"$first": "$creationDate"},
        "likes": {"$first": "$likes"}, "comments": {"$push": "$comments"}}};

const SORT_COMMENT_QUERY =  {"$sort": {"orderByUser": -1, "comments.likes": -1}};

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
  static retrievePublication(id, query) {
    var ObjectID = require("mongodb").ObjectID;
    let projectQuery = setConditionQuery(query.user);
    let findParams = {"$match": {_id: ObjectID(id)}};

    return Publication.aggregate([
      UNWIND_QUERY, projectQuery, SORT_COMMENT_QUERY, GROUP_QUERY, findParams
      ]).exec()
  }

   /**
   * Consulta todos as Publicações.
   *
   * @returns {Promise}  Promise resolvida com uma lista de objetos Usuario
   * da forma que o mongo retorna. Recebe uma query com informações sobre
   * ordenação e filtering.
   */
  static search(query) {


    let projectQuery = setConditionQuery(query.user);
    let skip =  {"$skip": parseInt(query.skip)}
    let limit = {"$limit": 10}
    let findParams = {};
    let sortParams = {};

    //When user is acessing his home page
    if(!query.orderBy) {
      findParams = {"$match": {"ownerUsername": query.user}};
      sortParams = {"$sort": {"creationDate": DESCENDING_ORDER}};
    } else {
      sortParams = getSortParams(query.orderBy);
      findParams = getFindParams(query.filterByGenres, query.user);
    }

    return Publication.aggregate([
      UNWIND_QUERY, projectQuery, SORT_COMMENT_QUERY, GROUP_QUERY, findParams, sortParams, skip, limit
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

function setConditionQuery(userParam) {
  let projectQuery = PROJECT_QUERY;

  projectQuery["$project"]["orderByUser"] = {$cond: { if: { $eq: [ "$comments.ownerUsername", userParam ] }, then: 1, else: 0 }}

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
