/**
 * @ @author: Razvan Rauta
 * @ Date: Mar 21 2021
 * @ Time: 20:15
 */

import handlebars from 'handlebars'
import fs from 'fs'
import path from 'path'
import smtpTransport from './smtpTransport'

interface SendWelcomeEmail {
    to: string
}
interface SendPaymentEmail {
    to: string
    orderId: string
}

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

export const sendPaymentEmail = async (
    props: SendPaymentEmail
): Promise<string> => {
    const emailTemplateSource = fs.readFileSync(
        path.join(__dirname, `templates/payment.hbs`),
        'utf8'
    )

    const template = handlebars.compile(emailTemplateSource)

    const htmlToSend = template({ orderId: props.orderId })

    const mailOptions = {
        from: process.env.MAILGUN_FROM!,
        to: props.to,
        subject: `Payment for order ${props.orderId}`,
        html: htmlToSend,
    }

    try {
        const { message } = await smtpTransport.sendMail(mailOptions)
        return message ?? `Payment mail sent to ${props.to}`
    } catch (error) {
        if (!process.env.MAIL_TEST) {
            console.log('Failed to send e-mail', error)
            return 'Failed to send e-mail'
        }
    }
    return 'Check mailtrap'
}
