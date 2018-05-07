import nodemailer from 'nodemailer';
import handlebars from 'express-handlebars';
import hbs from 'nodemailer-express-handlebars';
import path from 'path';

/**
 * @FIXME Esconder senha do email
 */
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'hipstermusicteam@gmail.com',
    pass: 'hipster123456'
  }
});

transporter.use('compile', hbs({
  viewEngine: handlebars.create({}),
  viewPath: path.resolve(__dirname, "./")
}));

const data = {
  from: 'HippsterSupport <support@hipstermusic.com.br>',
  to: "",
  subject: 'Confirmação de cadastro',
  template: 'registrationemail',
  context: {
    nome: '',
    link: "http://hipstermusic.herokuapp.com/confirmation/"
  }
};

export class EmailService {
  /**
   * Responsavel por montar e enviar o email de confirmação de
   * registro.
   *
   * @param {String} token referente a confirmação.
   * @param {Object} to que cotém os dados para o envio do email.
   */
  static sendRegistrationMail (token, to) {
    data.to= to.nome + ', ' + to.email;
    data.context.nome = to.nome;
    data.context.link += token;
    transporter.sendMail(data, function (err, info) {
      if(err)
        console.log(err);
      else
        console.log(info);
    });
  }
}
