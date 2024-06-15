import mongoose, {Schema, model} from 'mongoose';

const orderSchema = new Schema({
    
    user: {
        type: String,
        required: true
    },
    items: {
        type: Array,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    address: {
        type: Object,
        required: true
    },
    status: {
        type: String,
        default: "Processing"
    },
    date: {
        type: Date,
        default: Date.now()
    },
    paymentStatus: {
        type: Boolean,
        default: false
    }
}); //{timestamps: true}

const Order = mongoose.models.order ||  model('Order', orderSchema);

export default Order;
