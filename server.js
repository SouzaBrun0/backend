const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

let favorites = [];

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get('/favorites', (req, res) => {
  res.json(favorites);
});

app.post('/favorites', (req, res) => {
  const favorite = req.body;
  if (!favorites.find((f) => f.id === favorite.id)) {
    favorites.push(favorite);
    res.status(201).json({ message: 'Imagem adicionada aos favoritos!' });
  } else {
    res.status(400).json({ message: 'Imagem já está nos favoritos.' });
  }
});

app.delete('/favorites/:id', (req, res) => {
  const id = req.params.id;
  favorites = favorites.filter((f) => f.id !== id);
  res.json({ message: 'Imagem removida dos favoritos.' });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
