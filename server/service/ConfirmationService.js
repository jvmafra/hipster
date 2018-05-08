import RegisterToken from "../model/RegisterToken";

export class ConfirmationService {
  static createRegisterToken(token) {
    const tokenMongoose = new RegisterToken(token);
    return  new Promise((resolve, reject) => {
      tokenMongoose.save((err, result) => (err) ? reject(err) :resolve(result));
    });
  }

  static retrieveRegistrationToken(uuid) {
    return new Promise((resolve, reject) =>
      RegisterToken.findOne({uuid: uuid}, (err, result) => {
        if (err) return reject(err);
        if (!result) return reject(new Error("Não foi possível recuperar o token. Token inválido."));
        return resolve(result);
      })
    );
  }

  static deleteToken(uuid) {
    return new Promise((resolve, reject) =>
      RegisterToken.deleteOne({uuid: uuid}, (err, result) => {
        if (err) return reject(err);
        if (!result) return reject(new Error("Não foi possível deletar o token. Token inválido."));
        return resolve(result);
      })
    );
  }
}
