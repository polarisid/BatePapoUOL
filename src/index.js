let nome = prompt("Qual seu nome?");
let idinterval;
let messages;
let msgHTML= document.querySelector(".messages-container");
enviarNome(nome);



//https://mock-api.driven.com.br/api/v4/uol/messages

//responder 400 - se já houver um user online - enquanto isso solicitar novo nome
//status 200 - ok


function enviarNome(id){
    const promessa = axios.post("https://mock-api.driven.com.br/api/v4/uol/participants ", {name:id})
    promessa.then(manterVivo)
    carregarMsg()
    promessa.catch(tratarFalha)
    return;
}

function tratarFalha(erro) {
    
	const statusCode = erro.response.status;
	if(statusCode=="400"){
        alert("existe este user online")
        location.reload();
    }
    else{
        alert("Ocorreu algum erro")
    }
    console.log(erro)
    location.reload();
}

function manterVivo(){//este puxa a estou vivo
    idinterval = setInterval(estouVivo, 5000);
}

function estouVivo(){ //este puxa a carregarMSG
    
    const promisse2 = axios.post("https://mock-api.driven.com.br/api/v4/uol/status", {name:nome})

    console.log("Estou Vivo")
    promisse2.catch(tratarFalha)
    carregarMsg()
    
}

function carregarMsg(){//este puxa a exibir msg
    messages=axios.get("https://mock-api.driven.com.br/api/v4/uol/messages").then(res =>showResponse(res));
    //messages.then(exibirMsgs)
    exibirMsgs()
}

function exibirMsgs(){
    //msgHTML.innerHTML("")
    console.log(messages);
}