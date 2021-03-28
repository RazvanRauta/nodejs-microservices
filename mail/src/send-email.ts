import nodemailer, { Transporter } from 'nodemailer'
import mg from 'nodemailer-mailgun-transport'
import handlebars from 'handlebars'
import fs from 'fs'
import path from 'path'

interface SendWelcomeEmail {
    to: string
}

let smtpTransport: Transporter

const mailgunTransport = nodemailer.createTransport(
    mg({
        auth: {
            api_key: process.env.MAILGUN_API_KEY!,
            domain: process.env.MAILGUN_DOMAIN!,
        },
        host: 'api.eu.mailgun.net',
    })
)

const mailtrapTransport = nodemailer.createTransport({
    host: 'smtp.mailtrap.io',
    port: 2525,
    auth: {
        user: '8ac5c736c58436',
        pass: '8ba5829e14414e',
    },
})

smtpTransport = process.env.MAIL_TEST ? mailtrapTransport : mailgunTransport

export const sendWelcomeEmail = async (
    props: SendWelcomeEmail
): Promise<string> => {
    const emailTemplateSource = fs.readFileSync(
        path.join(__dirname, `templates/welcome.hbs`),
        'utf8'
    )

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
        return message ?? `Mail sent to ${props.to}`
    } catch (error) {
        if (!process.env.MAIL_TEST) {
            console.log('Failed to send e-mail', error)
            return 'Failed to send e-mail'
        }
    }
    return 'Check mailtrap'
}
