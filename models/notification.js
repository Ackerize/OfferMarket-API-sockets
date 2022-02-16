const { Schema, model } = require("mongoose");

const notificationSchema = new Schema(
  {
    message: {
      type: String,
      required: true,
      default: 'Agregó un nuevo producto',
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    read: {
      type: Boolean,
      default: false,
    },
    seller: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    }
  },
  {
    timestamps: true,
  }
);

module.exports = model("Notification", notificationSchema);
