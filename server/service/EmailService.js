import nodemailer from 'nodemailer';
import handlebars from 'express-handlebars';
import hbs from 'nodemailer-express-handlebars';
import path from 'path';
import { domain } from '../../server'

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
  context: {
    nome: '',
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
    data.subject = 'Confirmação de cadastro';
    data.template= 'registrationemail';

    data.to= to.nome + ', ' + to.email;
    data.context.nome = to.nome;
    data.context.link = domain + "/confirmation/" + token;

    transporter.sendMail(data, function (err, info) {
      if(err)
        console.log(err);
      else
        console.log(info);
    });
  }

  static sendReportMail (content) {
    data.subject = 'You have a new report on hipster';
    data.to= 'hipstermusicteam@gmail.com';
    data.context = undefined;
    data.html = content;

    transporter.sendMail(data, function (err, info) {
      if(err)
        console.log(err);
      else
        console.log(info);
    });
  }
}
