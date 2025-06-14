const express = require('express');
const router = express.Router();
const Evento = require('../models/event');
const mongoose = require('mongoose');

// Cadastro de eventos (POST)
router.post('/cadastro', async (req, res) => {

  try {
    const evento = new Evento(req.body);
    const savedEvento = await evento.save();
    res.status(201).json({ message: 'Evento cadastrado com sucesso!', evento: savedEvento });
  } catch (err) {
    res.status(400).json({ message: 'Erro ao cadastrar evento.', errors: err });
  }

});

// Listar eventos por ano, mes e dia (GET)
router.get('/eventos', async (req, res) => {
  const { mes, dia } = req.query;
  if (!mes || !dia) return res.status(400).json({ message: "Informe 'mes' e 'dia' como parâmetros." });

  try {
    const eventos = await Evento.find({
      $expr: {
        $and: [
          { $eq: [ { $month: "$data" }, mes ] },
          { $eq: [ { $dayOfMonth: "$data" }, dia ] }
        ]
      }
    });

    res.json(eventos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Eventos próximos 30 dias
router.get('/eventos/proximos', async (req, res) => {
  try {
    const hoje = new Date();
    const futuro = new Date();
    futuro.setDate(futuro.getDate() + 30);

    const eventos = await Evento.find({
      ultima_data: { $gte: hoje, $lte: futuro }
    }).sort('ultima_data');

    res.json(eventos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Eventos "sempre" (GET)
router.get('/eventos/sempre', async (req, res) => {
  const { mes } = req.query;
  if (!mes) return res.status(400).json({ message: "Informe 'mes'." });

  try {
    const eventos = await Evento.find({
      sempre: true,
      $expr: {
        $eq: [{ $month: "$ultima_data" }, parseInt(mes)]
      }
    });

    res.json(eventos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Eventos mensais
router.get('/eventos/mensal', async (req, res) => {

  const { ano, mes } = req.query;
  if (!ano || !mes) return res.status(400).json({ message: "Informe 'ano' e 'mes'." });

  try {
    const eventos = await Evento.find({
      data: { $lte: new Date(ano, mes) },
      ultima_data: { $gte: new Date(ano, mes - 1, 1) }
    });

    res.json(eventos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }

});

// Eventos "sempre"
router.get('/eventos/sempre', async (req, res) => {

  const { mes } = req.query;
  if (!mes) return res.status(400).json({ message: "Informe 'mes'." });
    console.log(mes);
  try {
    const eventos = await Evento.find({
      sempre: true,
      ultima_data: {
        $gte: new Date(2000, mes - 1, 1),
        $lt: new Date(2000, mes, 1)
      }
    });

    res.json(eventos);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }

});

//todos os eventos
router.get('/eventos/todos', async (req, res) => {

  try {
    const eventos = await Evento.find({});
    res.json(eventos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }

});

// Deletar evento
router.delete('/delete/:id', async (req, res) => {

  try {
    const evento = await Evento.findOneAndDelete({_id: req.params.id});
    if (!evento) return res.status(404).json({ message: 'Evento não encontrado.' });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }

});

// Atualizar evento
router.put('/update/:id', async (req, res) => {

  try {
    const evento = await Evento.findOneAndUpdate({_id:req.params.id}, {$set: req.body}, { new: true });
    if (!evento) return res.status(404).json({ message: 'Evento não encontrado.' });

    res.json({ message: 'Evento atualizado com sucesso!', evento });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }

});

// Buscar um único evento
router.get('/unicoevento/:id', async (req, res) => {

  try {
    const evento = await Evento.findById(req.params.id);
    if (!evento) return res.status(404).json({ message: 'Evento não encontrado.' });
    res.json(evento);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }

});

module.exports = router;
