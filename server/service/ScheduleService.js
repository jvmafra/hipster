import fetchVideoInfo from 'youtube-info';
import Publication from '../model/Publication'
import Scheduler from '../model/Scheduler'

const MAX_VIEWS = 1000000;
const FIRST_INDEX = 0;
const HOURS_LIMIT = 40;

export class ScheduleService {

  /**
  * Remove videos that acquired more than 1000000 than views.
  */
  static async removeVideos() {
    try {
      var arrayPublication = await Publication.find({}).select('videoID');
      var videosBiggerThanMax = await checkCountViewInfo(arrayPublication);
      await Publication.remove({'_id':{'$in':videosBiggerThanMax}}).exec();
      var numberOfDeletes = videosBiggerThanMax.length;
      saveSchedulerInfo(numberOfDeletes);
    } catch(err) {
      // This should be improve on the future
      console.log("Something wrong happened in ScheduleService");
    }

  }

  /**
  * Necessary because of heroku. This a just a workaround
  */
  static async checkScheduler() {
    var schedulerInfo = await Scheduler.find().sort({creationDate:-1}).limit(1).exec();

    //Check if removeVideos function was called at least one time.
    if (schedulerInfo.length !== 0) {
      var lastScheduleActivationDate = schedulerInfo[FIRST_INDEX].creationDate
      var currentDate = new Date();

      var hoursBetweenLastSchedule = getHoursBetweenLastSchedule(lastScheduleActivationDate, currentDate);

      if (hoursBetweenLastSchedule > HOURS_LIMIT) {
        this.removeVideos();
      }
    } else {
      this.removeVideos();
    }

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

function saveSchedulerInfo(numberOfDeletes) {
  var scheduler = {};
  scheduler["numberOfDeletes"] = numberOfDeletes;

  const schedulerrMongoose = new Scheduler(scheduler);
  schedulerrMongoose.save();
}

function getHoursBetweenLastSchedule(lastScheduleActivationDate, currentDate) {
  var hours = Math.abs(currentDate - lastScheduleActivationDate) / 36e5;

  return hours;
}
