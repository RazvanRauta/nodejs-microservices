/**
 * @author: Razvan Rauta
 * Date: Mar 28 2021
 * Time: 16:59
 */

import nodemailer, { Transporter } from 'nodemailer'
import mg from 'nodemailer-mailgun-transport'

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
        user: 'user',
        pass: 'pass',
    },
})

smtpTransport = process.env.MAIL_TEST ? mailtrapTransport : mailgunTransport

export default smtpTransport
