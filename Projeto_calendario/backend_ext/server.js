const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

// Conexão com MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB conectado'))
  .catch(err => console.error(err));

// Rotas
const eventRoutes = require('./routes/eventRoutes');
app.use('/api', eventRoutes);

// Porta
const PORT = process.env.PORT || 3000;
app.get('/', (req, res) => { res.json({message: "Rota Aberta Calendário"}) })
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
