const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Nombre es obligatorio'],
    },
    email: {
      type: String,
      required: [true, 'Email es obligatorio'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Contraseña es obligatoria'],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('User', userSchema);
