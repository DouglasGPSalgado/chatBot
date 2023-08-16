// Importa a classe MessagingResponse do módulo 'twilio.twiml'
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const axios = require("axios")

// Define a variável de estado 'currentStep' como 'start' inicialmente
var currentStep = 'start';

// Cria um objeto vazio 'collectedData' para armazenar as informações coletadas
var collectedData = {};

// Função para lidar com mensagens recebidas
function handleMessages(req, res) {
    // Cria uma nova instância da classe MessagingResponse
    const response = new MessagingResponse();
    // Obtém uma referência ao objeto de mensagem
    const msg = response.message();
    // Obtém o conteúdo da mensagem recebida e remove espaços em branco
    const userInput = req.body.Body.trim();

    if (currentStep === 'start') {
        // Se a etapa atual for 'start', envia uma mensagem de boas-vindas e avança para a próxima etapa
        msg.body("Olá, eu sou uma assistente virtual e estou aqui para te ajudar. Por favor, digite o seu Nome:");
        currentStep = 'get_name';
    } else if (currentStep === 'get_name') {
        // Se a etapa atual for 'get_name', armazena o nome fornecido pelo usuário e pede o CPF
        collectedData.name = userInput;
        msg.body(`Olá, ${collectedData.name}! Agora, digite o seu CPF:`);
        currentStep = 'get_cpf';
    } else if (currentStep === 'get_cpf') {
        // Se a etapa atual for 'get_cpf', verifica se o CPF tem exatamente 11 caracteres
        if (userInput.length === 11) {
            // Armazena o CPF fornecido pelo usuário e pede o CEP
            collectedData.cpf = userInput;
            msg.body(`Ótimo! Agora, digite o seu CEP:`);
            currentStep = 'get_cep';
        } else {
            msg.body("CPF inválido. Certifique-se de digitar 11 caracteres numéricos para o CPF.");
        }
    } else if (currentStep === 'get_cep') {
        // Se a etapa atual for 'get_cep', armazena o CEP fornecido pelo usuário e faz uma solicitação à API ViaCEP para obter informações de endereço
        collectedData.cep = userInput;
        
        axios.get(`https://viacep.com.br/ws/${collectedData.cep}/json/`)
            .then(resp => {
                // Se a solicitação à API ViaCEP for bem-sucedida, constrói uma mensagem de resposta com as informações coletadas e de endereço
                const addressInfo = resp.data;
                msg.body(`Obrigado por fornecer as informações!\nNome: ${collectedData.name}\nCPF: ${collectedData.cpf}\nCEP: ${collectedData.cep}\nEndereço: ${addressInfo.logradouro}, ${addressInfo.bairro}, ${addressInfo.localidade}, ${addressInfo.uf}`);           
                currentStep = 'start'; // Define a etapa atual como 'completed'
                res.send(response.toString()); // Envia a resposta para o usuário
            })
            .catch(error => {
                // Se houver um erro na solicitação à API ViaCEP, envia uma mensagem de erro
                console.error(error);
                msg.body("Houve um erro ao buscar o endereço. Por favor, verifique o CEP e tente novamente.");
                res.send(response.toString()); // Envia o erro para o usuário
            });
            return
    } else {
        // Se a etapa atual não for reconhecida, envia uma mensagem indicando que a resposta não foi entendida
        msg.body("Não entendi a sua resposta. Por favor, siga as instruções.");
    }
    res.send(response.toString()); // Envia a resposta para o usuário
}

// Exporta a função 'handleMessages' para uso externo
exports.handleMessages = handleMessages;
