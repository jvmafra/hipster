
import * as erro from '../util/ErroHandler';

export class UserValidator {

  /**@FIXME: este comentário está redundante.
   * Checa se um user é valido.
   *
   * @param   {user}  Usuario a ser verificado
   * @return  {Object} {'retorno': boolean, 'mensagem': string};
   */

  static isValid(user) {

    let isValid = false;
    let message;

    if (user.nome === ""){
      message = erro.CADASTRO.VALIDACAO_NOME;

    } else if (user.email === "") {
      message = erro.CADASTRO.VALIDACAO_EMAIL;

    } else if (user.dataNascimento === "") {
      message = erro.CADASTRO.VALIDACAO_DATA_NASCIMENTO;

    } else {
      isValid = true;
      message = "ok";
    }

    return {'retorno': isValid, 'mensagem': message};
  }

}

//@TODO: Check this in the future
function emailHasValidFormat(emailToCheck) {
  let reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return reg.test(emailToCheck);
}
