const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema(
  {
    boardId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Board',
      required: true,
    },
    sender: String,
    text: String,
    time: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Message', messageSchema);
