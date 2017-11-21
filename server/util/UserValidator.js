  
import * as erro from '../util/ErroHandler';

export class UserValidator {
    /**
   * Checa se um usuario é valido.
   *
   * @param   {Usuario}  Usuario a ser verificado
   * @return  {Boolean} Se o usuario é valido ou não
   */

  static isValido(usuario) {

    let retorno;
    let mensagem;

    if (usuario.nome === ""){
      retorno = false;
      mensagem = erro.CADASTRO.VALIDACAO_NOME;
    } 

    else if (usuario.email === "") {
      retorno = false;
      mensagem = erro.CADASTRO.VALIDACAO_EMAIL;

    } else if (!validaEmail(usuario.email)) {
      retorno = false;
      mensagem = erro.CADASTRO.VALIDACAO_EMAIL_FORMATO;
    }
    else if (usuario.senha === "") {
      retorno = false;
      mensagem = erro.CADASTRO.VALIDACAO_SENHA;
    } 
    else if (usuario.senha.length < 8) {
      retorno = false;
      mensagem = erro.CADASTRO.VALIDACAO_SENHA_TAMANHO;

    } else if (usuario.dataNascimento === "") {
      retorno = false;
      mensagem = erro.CADASTRO.VALIDACAO_DATA_NASCIMENTO;

    } else if (!validaData(usuario.dataNascimento)) {
      retorno = false;
      mensagem = erro.CADASTRO.VALIDACAO_DATA_NASCIMENTO_FORMATO;

    } else {
      retorno = true;
      mensagem = "ok";
    }

    return {'retorno': retorno, 'mensagem': mensagem};


  }


}
  
function validaEmail(email) {
  var reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return reg.test(email);
}

function validaData(data) {
  var reg = /^(((0[1-9]|[12]\d|3[01])\/(0[13578]|1[02])\/((19|[2-9]\d)\d{2}))|((0[1-9]|[12]\d|30)\/(0[13456789]|1[012])\/((19|[2-9]\d)\d{2}))|((0[1-9]|1\d|2[0-8])\/02\/((19|[2-9]\d)\d{2}))|(29\/02\/((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))))$/g;
  return reg.test(data);
}