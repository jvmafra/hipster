import fetchVideoInfo from 'youtube-info';
import Publication from '../model/Publication'

const MAX_VIEWS = 1000000;

export class ScheduleService {

  /**
  * Remove videos that acquired more than 1000000 than views.
  */
  static async removeVideos () {
    var arrayPublication = await Publication.find({}).select('videoID').exec();
    var videosBiggerThanMax = await checkCountViewInfo(arrayPublication);

    Publication.remove({'_id':{'$in':videosBiggerThanMax}}).exec();
  }

}

/**
 *  @param  {Array}  arrayPublication : Array of publication's objects saved in database.
 *  The publication objects consist only of id and videoID.
 *  @return {Array}  videosBiggerThanMax: Array of publication ids that acquired more than 1000000 of views
 */
async function checkCountViewInfo(arrayPublication) {
  var videosBiggerThanMax = [];

  for (let index in arrayPublication) {
    let videoID = arrayPublication[index].videoID;
    let id = arrayPublication[index]._id;
    let videoInfo = await getVideoInfoFromYoutubeApi(videoID);

    if (videoInfo.views > MAX_VIEWS) {
      videosBiggerThanMax.push(id);
    }
  }

  return videosBiggerThanMax;
}

function getVideoInfoFromYoutubeApi(videoID) {
  return new Promise((resolve, reject) =>
    fetchVideoInfo(videoID).then(function (videoInfo, err) {
      if (err) return reject(err);
      if (!videoInfo.url) return reject("Video doesn't exist");

      return resolve(videoInfo);
    })
  );
}
