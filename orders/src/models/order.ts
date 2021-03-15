/**
 * @ @author: Razvan Rauta
 * @ Date: Mar 14 2021
 * @ Time: 13:20
 */

import mongoose from 'mongoose'
import { OrderStatus } from '@rrazvan.dev/ticketing-common'
import { TicketDoc } from './ticket'
import { updateIfCurrentPlugin } from 'mongoose-update-if-current'

interface OrderAttrs {
    ticket: TicketDoc
    userId: string
    status: OrderStatus
    expiresAt: Date
}

interface OrderDoc extends mongoose.Document {
    ticket: TicketDoc
    userId: string
    status: OrderStatus
    expiresAt: Date
    version: number
}

interface OrderModel extends mongoose.Model<OrderDoc> {
    build(attrs: OrderAttrs): OrderDoc
    findByEvent(event: {
        id: string
        version: number
    }): Promise<OrderDoc | null>
}

const orderSchema = new mongoose.Schema(
    {
        ticket: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Ticket',
        },
        expiresAt: {
            type: mongoose.Schema.Types.Date,
        },
        userId: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            required: true,
            enum: Object.values(OrderStatus),
            default: OrderStatus.Created,
        },
    },
    {
        toJSON: {
            transform(doc, ret) {
                ret.id = ret._id
                delete ret._id
            },
        },
    }
)

orderSchema.set('versionKey', 'version')
orderSchema.plugin(updateIfCurrentPlugin)

orderSchema.statics.findByEvent = (event: { id: string; version: number }) => {
    return Order.findOne({
        _id: event.id,
        version: event.version - 1,
    })
}
orderSchema.statics.build = (attrs: OrderAttrs) => {
    return new Order(attrs)
}

const Order = mongoose.model<OrderDoc, OrderModel>('Order', orderSchema)

export { Order, OrderStatus }
