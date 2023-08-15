const MessagingResponse = require('twilio').twiml.MessagingResponse;

var name, cpf, cep, choice = null;

function choices(req, res, next) {
    const response = new MessagingResponse();
    const msg = response.message();
    choice = req.body.Body
    if (choice == 1) {
        msg.body("Vamos nessa!");
        res.send(response.toString());


        choice = null;
    } else if (choice == 2) {
        msg.body("Obrigado pela atenção!");
        res.send(response.toString());
        choice = null;
    } else {
        msg.body("Olá, eu sou uma assistente virtual e estou aqui para te ajudar. Deseja continuar? \n1-sim. \n2- Não");
        res.send(response.toString())
        console.log(choice)
    }

}

exports.Info = choices, async (req, res) => {
    const response = new MessagingResponse();
    const msg = response.message();
    const message = req.body.Body
    msg.body("Funcionou!");
    console.log(message);
    res.send(response.toString());
};