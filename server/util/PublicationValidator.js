import * as erro from '../util/ErroHandler';
import fetchVideoInfo from 'youtube-info';

const MAX_VIEWS = 1000000;

export class PublicationValidator {

  /**@FIXME: este comentário está redundante.
   * Checa se um user é valido.
   *
   * @param   {publication}  Publication a ser verificada
   * @return  {Object} {'retorno': boolean, 'mensagem': string};
   */

  static async isValid(publication) {
    let isValid = false;
    var message = '';

    //@TODO Need Refactoring when token and username problem be fixed
    if (publication.ownerUsername === undefined || publication.ownerUsername.trim() === ""){
      message += erro.PUBLICATION.VALIDACAO_OWNER + ';';
    }

    if (publication.title === undefined || publication.title.trim() === "") {
      publication.title = "";
    }

    if (publication.url === undefined || publication.url.trim() === "") {
      message += erro.PUBLICATION.VALIDACAO_URL + ';';
    } else if (getVideoIDFromUrl(publication.url) === 'error') {
      message += erro.PUBLICATION.VALIDACAO_URL_YOUTUBE + ';';
    } else {
      //@TODO: In future, this could be in PublicationService
      let videoID = getVideoIDFromUrl(publication.url);
      message += await checkYoutubeAPIInfo(videoID, publication);
    }

    if (publication.year){
      let isNumber = Number.isInteger(publication.year);
      if(!isNumber){
        message += erro.PUBLICATION.VALIDACAO_YEAR + ';'
      }
    }

    //@TODO Need refactoring when hipster genres be defined
    if (publication.genres === undefined || publication.genres.length === 0) {
      message += erro.PUBLICATION.VALIDACAO_GENRES + ';';
    }

    if (message == ''){
      isValid = true;
      message = "ok";
    } else {
      isValid = false;
    }

    return {'return': isValid, 'message': message};
  }

}

async function checkYoutubeAPIInfo(videoID, publication) {
  let message = "";

  try {
    const response = await getVideoInfo(videoID);
    publication.title = response.title + " HIPSTER_FLAG "  + publication.title;
    publication.videoID = videoID;

    if (response.genre != "Music") {
      message += erro.PUBLICATION.VALIDACAO_CATEGORY + ';';
    }

    if (response.views > MAX_VIEWS) {
      message += erro.PUBLICATION.VALIDACAO_VIEW_COUNT + ';';
    }

  } catch(err) {
    message += erro.PUBLICATION.VALIDACAO_URL_YOUTUBE + ';';
  }

  return message;
}

function getVideoIDFromUrl(url) {
  var regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  var match = url.match(regExp);

  if (match && match[2].length == 11) {
    return match[2];
  } else {
    return "error"
  }

  return "error"
}

function getVideoInfo(videoID) {
  return new Promise((resolve, reject) =>
    fetchVideoInfo(videoID).then(function (videoInfo, err) {
      if (err) return reject(err);
      if (!videoInfo.url) return reject("Video doesn't exist");

      return resolve(videoInfo);
    })
  );
}
