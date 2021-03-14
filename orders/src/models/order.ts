import mongoose from 'mongoose'
import { OrderStatus } from '@rrazvan.dev/ticketing-common'
import { TicketDoc } from './ticket'

type Status = 'expired' | 'paid' | 'pending'

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
}

interface OrderModel extends mongoose.Model<OrderDoc> {
    build(attrs: OrderAttrs): OrderDoc
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

orderSchema.statics.build = (attrs: OrderAttrs) => {
    return new Order(attrs)
}

const Order = mongoose.model<OrderDoc, OrderModel>('Order', orderSchema)

export { Order, OrderStatus }
