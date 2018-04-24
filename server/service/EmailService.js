import nodemailer from 'nodemailer';
import handlebars from 'express-handlebars';
import hbs from 'nodemailer-express-handlebars';
import path from 'path';
import juice from 'juice';

let REGISTRATION_MAIL = '<div>' +
  // + '<img style="margin-left: 45%;" src="../../src/assets/hipster-logo2.png">' +
  + '<p style="text-align: center">' +
  + 'Olá, seu cadastro está quase completo. Para prosseguir com seu cadastro clique no link a baixo:' +
  + '</p>'
  + '</div>';


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
    link: "http://hipstermusic.herokuapp.com/confirmation/a4qas412Fwrea"
  }
};

export class EmailService {
  static sendRegistrationMail (token, to) {
    const nome = "GileBoy";
    data.to= nome + ', gileadekelvin@gmail.com';
    data.context.nome = nome;
    transporter.sendMail(data, function (err, info) {
      if(err)
        console.log(err);
      else
        console.log(info);
    });
  }
}

EmailService.sendRegistrationMail();
module.exports = EmailService;
