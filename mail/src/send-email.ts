import nodemailer from 'nodemailer'
import mg from 'nodemailer-mailgun-transport'
import handlebars from 'handlebars'
import fs from 'fs'
import path from 'path'

interface SendWelcomeEmail {
    to: string
}

const mailgunAuth = {
    auth: {
        api_key: process.env.MAILGUN_API_KEY!,
        domain: process.env.MAILGUN_DOMAIN!,
    },
    host: 'api.eu.mailgun.net',
}

export const sendWelcomeEmail = async (
    props: SendWelcomeEmail
): Promise<string> => {
    const emailTemplateSource = fs.readFileSync(
        path.join(__dirname, `templates/welcome.hbs`),
        'utf8'
    )

    const smtpTransport = nodemailer.createTransport(mg(mailgunAuth))

    const template = handlebars.compile(emailTemplateSource)

    const htmlToSend = template({})

    const mailOptions = {
        from: process.env.MAILGUN_FROM!,
        to: props.to,
        subject: 'Welcome to Ticketing',
        html: htmlToSend,
    }

    try {
        const { message } = await smtpTransport.sendMail(mailOptions)
        return message
    } catch (error) {
        console.log('Failed to send e-mail', error)
        return 'Failed to send e-mail'
    }
}
