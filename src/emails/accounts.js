const sgMail=require('@sendgrid/mail')
const sendGridAPIKey=process.env.SENDGRID_API_KEY

sgMail.setApiKey(sendGridAPIKey)

    const welcomeEmail=(email,name)=>{
        sgMail.send({
            to:email,
            from:'bhatiaa746@gmail.com',
            subject:'Welcome to our application...!',
            text:'Welcome...'+ name +' To our app. If you need any help than just text me'
        })
    }
    const cancelAcount=(email,name)=>{
        sgMail.send({
            to:email,
            from:'bhatiaa746@gmail.com',
            subject:'Cancelling your account!',
            text:'Hello '+ name +' Come back soon..! If you have any issue than contact to us.'
        })
    }
    module.exports={
        welcomeEmail,
        cancelAcount
    }


