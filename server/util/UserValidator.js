
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

    } else if (!this.emailHasValidFormat(user.email)) {
      message = erro.CADASTRO.VALIDACAO_EMAIL_FORMATO;

    } else if (user.senha === "") {
      message = erro.CADASTRO.VALIDACAO_SENHA;

    } else if (user.senha.length < 8) {
      message = erro.CADASTRO.VALIDACAO_SENHA_TAMANHO;

    } else if (user.dataNascimento === "") {
      message = erro.CADASTRO.VALIDACAO_DATA_NASCIMENTO;

    } else if (!this.dateHasValidFormat(user.dataNascimento)) {
      message = erro.CADASTRO.VALIDACAO_DATA_NASCIMENTO_FORMATO;

    } else {
      isValid = true;
      message = "ok";
    }

    return {'retorno': isValid, 'mensagem': message};
  }

  private static emailHasValidFormat(emailToCheck) {
    let reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return reg.test(emailToCheck);
  }

  private static dateHasValidFormat(dateToCheck) {
    let reg = /^(((0[1-9]|[12]\d|3[01])\/(0[13578]|1[02])\/((19|[2-9]\d)\d{2}))|((0[1-9]|[12]\d|30)\/(0[13456789]|1[012])\/((19|[2-9]\d)\d{2}))|((0[1-9]|1\d|2[0-8])\/02\/((19|[2-9]\d)\d{2}))|(29\/02\/((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))))$/g;
    return reg.test(dateToCheck);
  }
}

