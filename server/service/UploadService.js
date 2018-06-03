import fetchVideoInfo from 'youtube-info';
import Publication from '../model/Publication';
import Scheduler from '../model/Scheduler';
import googleStorage from '@google-cloud/storage';
import { UsuarioService } from './UsuarioService';

const storage = googleStorage({
  projectId: "hipster-acadf",
  keyFilename: "teste.json",
});


const bucket = storage.bucket("hipster-acadf.appspot.com");


export class UploadService {

  static async uploadImageToStorage(file, username) {
    return new Promise(async (resolve, reject) => {
      const fileName = file.originalname + '_' + username;
      const fileUpload = bucket.file(fileName);

      try {
        await uploadToFirebase(fileUpload, file.mimetype, file.buffer);
        const url = await getUrlFileFirebase(fileUpload);
        await updateUserPhoto(username, fileName, url[0])
        resolve(url[0]);
      } catch(err) {
        reject(err);
      }
    }) 
  };
}

 function uploadToFirebase(fileUpload, mimetype, buffer) {
  return new Promise((resolve, reject) => {

    let blobStream = fileUpload.createWriteStream({
      metadata: {contentType: mimetype}
    });

    blobStream.on('error', (error) => {
      reject('Something is wrong! Unable to upload at the moment.');
    });

    blobStream.on('finish', () => {
      resolve("File was uploaded");
    });

    blobStream.end(buffer);
  });
}

function getUrlFileFirebase(fileUpload) {
  return fileUpload.getSignedUrl({action: 'read', expires: '03-09-2491'});
}

async function updateUserPhoto(username, filePhotoName, photoUrl) {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await UsuarioService.consultaUsuario(username);
      if (user.photoUrl) {
         deleteFile(user.filePhotoName);
      }
      await UsuarioService.updatePhotoInfo(username, filePhotoName, photoUrl);
      resolve("Info updated");
    } catch(err) {
      reject(err);
    }
  });
}

function deleteFile(filename) {
  return bucket.file(filename).delete().then(() => {}).catch(err => {
    //In the future we need a log for situations like that
  });
}


