import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
    buyer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    products: {
        type: Array,
        required: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    address1: {
        type: String,
        required: true,
    },
    address2: {
        type: String,
    },
    city: {
        type: String,
        required: true,
    },
    postalCode: {
        type: String,
    },
    phone: {
        type: String,
        required: true,
    },
    paymentMethod: {
        type: String,
        default: "cash",
    },
    totalAmount: {
        type: Number,
        required: true,
    },
    paymentStatus: {
        type: String,
        enum: ["pending", "paid", "failed"],
        default: "pending",
    },
    deliveryStatus: {
        type: String,
        enum: ["pending", "delivered", "failed", "stock issue"],
        default: "pending",
    }
}, { timestamps: true });

export default mongoose.models.Order || mongoose.model("Order", OrderSchema);