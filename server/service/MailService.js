import nodemailer from 'nodemailer';

var mailService = {
    sendEmail: function(content) {

        /**
        * @FIXME Esconder senha do email
        */ 
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                   user: 'hipstermusicteam@gmail.com',
                   pass: 'hipster123456'
               }
           });
        const mailOptions = {
        from: 'hipstermusicteam@gmail.com',
        to: 'hipstermusicteam@gmail.com',
        subject: 'You have a new report on hipster',
        html: content
        };

        transporter.sendMail(mailOptions, function (err, info) {
            if(err)
              console.log(err)
            else
              console.log(info);
         });
    }
}

module.exports = mailService;