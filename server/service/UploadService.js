import fetchVideoInfo from 'youtube-info';
import Publication from '../model/Publication';
import Scheduler from '../model/Scheduler';
import googleStorage from '@google-cloud/storage';
import firebase from 'firebase';

const MAX_VIEWS = 1000000;
const FIRST_INDEX = 0;
const HOURS_LIMIT = 40;

const storage = googleStorage({
  projectId: "hipster-acadf",
  keyFilename: "teste.json",
});


const bucket = storage.bucket("hipster-acadf.appspot.com");


export class UploadService {

  static async uploadImageToStorage(file) {
    let prom = new Promise((resolve, reject) => {
      if (!file) {
        reject('No image file');
      }
      console.log("sss");
      console.log(file.mimetype);
      let newFileName = `${file.originalname}_${Date.now()}`;
  
      let fileUpload = bucket.file(newFileName);
  
      const blobStream = fileUpload.createWriteStream({
        metadata: {
          contentType: file.mimetype
        }
      });
  
      blobStream.on('error', (error) => {
        console.log(error);
        reject('Something is wrong! Unable to upload at the moment.');
      });
  
      blobStream.on('finish', () => {
        console.log("here2");

        // The public URL can be used to directly access the file via HTTP.
        fileUpload.getSignedUrl({
          action: 'read',
          expires: '03-09-2491'
        }).then(signedUrls => {
          const url = signedUrls[0];
          console.log(url);
          resolve(url);
        });
      
      });
  
      blobStream.end(file.buffer);
    });
    return prom;
  }


}


