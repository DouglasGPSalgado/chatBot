// Importa a classe MessagingResponse do módulo 'twilio.twiml'
const MessagingResponse = require('twilio').twiml.MessagingResponse;

// Define a variável de estado 'currentStep' como 'start' inicialmente
var currentStep = 'start';

// Cria um objeto vazio 'collectedData' para armazenar as informações coletadas
var collectedData = {};

// Função para lidar com mensagens recebidas
function handleMessages(req, res) {
    // Cria uma nova instância de MessagingResponse
    const response = new MessagingResponse();
    const msg = response.message();

    // Remove espaços extras do corpo da mensagem recebida
    const userInput = req.body.Body.trim();

    // Verifica a etapa atual do processo
    if (currentStep === 'start') {
        // Define a resposta da mensagem de introdução
        msg.body("Olá, eu sou uma assistente virtual e estou aqui para te ajudar. Por favor, digite o seu Nome:");
        // Atualiza a etapa atual para 'get_name'
        currentStep = 'get_name';
    } else if (currentStep === 'get_name') {
        // Armazena o nome coletado no objeto 'collectedData'
        collectedData.name = userInput;
        // Define a resposta da mensagem para prosseguir com a coleta
        msg.body(`Olá, ${collectedData.name}! Agora, digite o seu CPF:`);
        // Atualiza a etapa atual para 'get_cpf'
        currentStep = 'get_cpf';
    } else if (currentStep === 'get_cpf') {
        // Armazena o CPF coletado no objeto 'collectedData'
        collectedData.cpf = userInput;
        // Define a resposta da mensagem para prosseguir com a coleta
        msg.body(`Ótimo! Agora, digite o seu CEP:`);
        // Atualiza a etapa atual para 'get_cep'
        currentStep = 'get_cep';
    } else if (currentStep === 'get_cep') {
        // Armazena o CEP coletado no objeto 'collectedData'
        collectedData.cep = userInput;
        // Define a resposta da mensagem para mostrar os dados coletados
        msg.body(`Obrigado por fornecer as informações!\nNome: ${collectedData.name}\nCPF: ${collectedData.cpf}\nCEP: ${collectedData.cep}`);
        // Atualiza a etapa atual para 'completed'
        currentStep = 'completed';
    } else {
        // Responde caso nenhuma etapa coincida (entrada inválida)
        msg.body("Não entendi a sua resposta. Por favor, siga as instruções.");
    }

    // Envia a resposta de volta ao cliente
    res.send(response.toString());
}

// Exporta a função 'handleMessages' para uso externo
exports.handleMessages = handleMessages;
