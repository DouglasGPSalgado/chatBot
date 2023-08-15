const express = require('express');
const MessagingResponse = require('twilio').twiml.MessagingResponse;


const response = new MessagingResponse();
const app = express();
const port = 3000;
const msg = response.message();


app.get('/', (req, res) => {
  res.send('Olá, mundo!');
});

app.post('/bot', (req, res) => {
msg.body("Funcionou!")
res.send(response.toString());

return String(response);
})

app.listen(port, () => {
  console.log(`Servidor está rodando na porta ${port}`);
});
