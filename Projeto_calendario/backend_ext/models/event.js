const mongoose = require('mongoose');

const EventoSchema = new mongoose.Schema({
  descricao: {
    type: String,
    required: true
  },
  data: {
    type: Date,
    required: true
  },
  ultima_data: {
    type: Date
  },
  sempre: {
    type: Boolean,
    default: false
  },
  cor: {
    type: String,
    validate: {
      validator: function (v) {
        return /^#(?:[0-9a-fA-F]{3}){1,2}$/.test(v);
      },
      message: props => `${props.value} não é uma cor hexadecimal válida!`
    }
  }
});

module.exports = mongoose.model('Evento', EventoSchema);
