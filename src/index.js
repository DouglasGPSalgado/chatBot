const express = require('express');
const { Info } = require('./controllers/choice');

const app = express();
const port = process.env.PORT || 3000; // Use a variável de ambiente do Heroku ou a porta 3000 localmente

app.use(express.urlencoded({ extended: false })); // Middleware para processar dados de formulário

app.get('/', (req, res) => {
  res.send('Olá, mundo!');
});

app.post('/bot', Info );

app.listen(port, () => {
  console.log(`Servidor está rodando na porta ${port}`);
});
