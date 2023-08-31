const nodeMailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');

let transporter = nodeMailer.createTransport({
    service:'gmail',
    host: 'smtp-gmail.com',
    port: 587,
    secure: false,
    auth:{
        user:'klgovardhan87@gmail.com',
        pass:'Govardhan87@'
    }
});

let rendertemplate = (data,relativepath)=>{
    let mailHTML;
    ejs.renderFile(
        path.join(__dirname,'../views/mailers', relativepath),
        data,
        function(err, template){
            if(err){console.log('error in rendering templates',err); return}

            mailHTML = template
        }
    )
    return mailHTML
}

module.exports= {
    transporter:transporter,
    rendertemplate:rendertemplate
}