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

   /**
   * Faz o upload de uma imagem no firebase
   *
   * @param   {File}  file Foto do usuário a ser salva.
   * @param   {username} username username do usuário
   * @returns {Promise}  Promise que retorna a url da imagem salva ou um erro;
   * 
   */
  static async uploadImageToStorage(file, username) {
    return new Promise(async (resolve, reject) => {
      const fileName = file.originalname + '_' + username + '_' + new Date().toString();
      const fileUpload = bucket.file(fileName);

      try {
        await uploadToFirebase(fileUpload, file.mimetype, file.buffer);
        const url = await getUrlFileFirebase(fileUpload);
        updateUserPhoto(username, fileName, url[0])
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


  /**
 * Retorna a Url da photo que foi persistida
 *
 * 
 * @returns {Promise}  Promise que retorna a url da imagem salva ou um erro;
 * 
 */
function getUrlFileFirebase(fileUpload) {
  return fileUpload.getSignedUrl({action: 'read', expires: '03-09-2491'});
}

/**
 * Faz o update das informações da foto que foi uploaded no firebase. Se o usuário já possuir uma 
 * foto no perfil, então é deletada a foto antiga no firebase
 * 
 * @param   {string}  photoUrl Url da foto persistida no firebase
 * @param   {string}  filePhotoName Nome do file da foto persistida no firebase
 * @param   {string} username username do usuário
 * 
 */
async function updateUserPhoto(username, filePhotoName, photoUrl) {
  try {
    const user = await UsuarioService.consultaUsuario(username);
    if (user.photoUrl) {
      deleteFile(user.filePhotoName);
    }
    await UsuarioService.updatePhotoInfo(username, filePhotoName, photoUrl);
  } catch(err) {
    //In the future we need a log for situations like that
  }
}

/**
 * Delete um arquivo no firebase 
 * 
 * @param   {string}  filename Nome do file da foto persistida no firebase
 * 
 */
function deleteFile(filename) {
  return bucket.file(filename).delete().then(() => {}).catch(err => {
    //In the future we need a log for situations like that
  });
}


