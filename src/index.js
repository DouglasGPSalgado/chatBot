const express = require('express');
const MessagingResponse = require('twilio').twiml.MessagingResponse;

const app = express();
const port = process.env.PORT || 3000; // Use a variável de ambiente do Heroku ou a porta 3000 localmente

app.use(express.urlencoded({ extended: false })); // Middleware para processar dados de formulário

app.get('/', (req, res) => {
  res.send('Olá, mundo!');
});

app.post('/bot', async (req, res) => {
  const response = new MessagingResponse();
  const msg = response.message();
  const message = await conversation.getMessages().items[5];
  msg.body("Funcionou!");
  console.log(message);
  res.send(response.toString());
});

app.listen(port, () => {
  console.log(`Servidor está rodando na porta ${port}`);
});
