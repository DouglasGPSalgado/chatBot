const express = require('express');
const { handleMessages } = require('./controllers/choice');

const app = express();
const port = process.env.PORT || 3000;

// Middleware para processar dados de formulário
app.use(express.urlencoded({ extended: false }));

// Rota de exemplo para a raiz do aplicativo
app.get('/', (req, res) => {
  res.send('Olá, mundo!');
});

// Rota para receber as mensagens do bot e chamar a função handleMessages
app.post('/bot', handleMessages);

// Função para iniciar o servidor
function startServer() {
  app.listen(port, () => {
    console.log(`Servidor está rodando na porta ${port}`);
  });
}

// Inicia o servidor chamando a função
startServer();
