const express = require('express');
const MessagingResponse = require('twilio').twiml.MessagingResponse;

const app = express();
const port = process.env.PORT || 3000; // Use a variável de ambiente do Heroku ou a porta 3000 localmente

app.use(express.urlencoded({ extended: false })); // Middleware para processar dados de formulário

app.get('/', (req, res) => {
  res.send('Olá, mundo!');
});

app.post('/bot', (req, res) => {
  const response = new MessagingResponse();
  const msg = response.message();

  msg.body("Funcionou!");
  
  res.send(response.toString());
});

app.listen(port, () => {
  console.log(`Servidor está rodando na porta ${port}`);
});
