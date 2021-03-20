/**
 *  @author: Razvan Rauta
 *  Date: Mar 20 2021
 *  Time: 19:02
 */

import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_KEY!, {
    apiVersion: '2020-08-27',
})
