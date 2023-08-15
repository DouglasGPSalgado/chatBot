const MessagingResponse = require('twilio').twiml.MessagingResponse;

var name, cpf, cep, choice = null;

function choices(req, res, next){
if(choice == 1){
    const response = new MessagingResponse();
    const msg = response.message();
    msg.body("Vamos nessa!");
    res.send(response.toString());


 choice = null;
}else if(choice == 2){
    const response = new MessagingResponse();
    const msg = response.message();
    msg.body("Obrigado pela atenção!");
    res.send(response.toString());
    choice = null;
}else{
    const response = new MessagingResponse();
    const msg = response.message();
    msg.body("Olá, eu sou uma assistente virtual e estou aqui para te ajudar. Deseja continuar? \n1-sim. \n2- Não");
    res.send(response.toString());
    choice = req.body.Body
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