const nodemailer = require('../config/nodemailer');


// this is another method of exporting methods
exports.newComment = (comment) =>{
    console.log('inside comment mailer');
    let htmlstring = nodemailer.rendertemplate({comment:comment},'/comments/new_comment.ejs')

    nodemailer.transporter.sendMail({
        from:'klgovardhan87@gmail.com',
        to:comment.user.email,
        subject : "New comment published",
         html: htmlstring //'<h1>Yup comment is published</h1>'
    },(err,info)=>{
        if(err){console.log('error in sending mail',err); return}

        console.log('message sent',info);
        return;
    });
}