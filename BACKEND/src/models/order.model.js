import mongoose from "mongoose";

const { Schema } = mongoose;

const orderSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    products: [
      {
        productId: { type: Schema.Types.ObjectId, ref: 'Product' },
        quantity: { type: Number, required: true },
      },
    ],
    totalAmount: {
      type: Number,
      required: true,
    },
    address: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      zip: { type: String, required: true },
      country: { type: String, required: true },
    },
    paymentDetails: {
      paymentMethod: { type: String, enum: ['UPI', 'Credit Card', 'Debit Card', 'Net Banking','COD'], required: true, default: 'COD' },
      status: { type: String, default: 'Pending' },
      transactionId: { type: String, required: true },
      created_at: { type: Date, default: Date.now },
    },
  },
  { timestamps: true }
);

export const Order = mongoose.model("Order", orderSchema);
