

let nome;
let idinterval;
let messages;
let msgHTML= document.querySelector(".messages-container");

let dados_msg;
let msgENVIAR;




function entry(){
    let nome1 = document.querySelector(".login-page input");
    let bina = document.querySelector(".login-page");
    bina.classList.add("escondido") 
    nome=nome1.value   
    enviarNome(nome);
    
}




//responder 400 - se já houver um user online - enquanto isso solicitar novo nome
//status 200 - ok
function enviarMSG(){
    msgENVIAR= document.querySelector(".input-box");
    
    
    const promisses = axios.post("https://mock-api.driven.com.br/api/v4/uol/messages", 
     {
        from: nome,
        to: "Todos",
        text: msgENVIAR.value,
        type: "message" // ou "private_message" para o bônus
    })
    promisses.then(carregarMsg)
    promisses.catch(tratarFalha)
   
    msgENVIAR.value="";
}

function enviarNome(id){
    const promessa = axios.post("https://mock-api.driven.com.br/api/v4/uol/participants ", {name:id})
    promessa.then(manterVivo)
    promessa.then(manterMSG)
    carregarMsg()
    promessa.catch(tratarFalha)
    return;
}

function tratarFalha(erro) {
	const statusCode = erro.response.status;
	if(statusCode=="400"){
        alert("existe este user online")
        //location.reload();
        window.location.reload()
    }
    else{
        alert("Ocorreu algum erro")
        window.location.reload()
    }
    console.log(erro)
    //location.reload();
    window.location.reload()
}

function manterVivo(){//este puxa a estou vivo
    idinterval = setInterval(estouVivo, 5000);
}
function manterMSG(){//este puxa a estou vivo
    idinterval = setInterval(carregarMsg, 3000);
}

function estouVivo(){ //este puxa a carregarMSG
    
    const promisse2 = axios.post("https://mock-api.driven.com.br/api/v4/uol/status", {name:nome})
    promisse2.catch(tratarFalha)
    
}

function carregarMsg(){//este puxa a exibir msg
    messages=axios.get("https://mock-api.driven.com.br/api/v4/uol/messages");
    messages.then(postarMsg)
    messages.catch(tratarFalha)
    //exibirMsgs()
}   

function postarMsg(resposta){
    dados_msg=resposta.data;
  
    msgHTML.innerHTML =""

    
    for(var i = 0;i<(dados_msg.length);i++){
    if(dados_msg[i].type =="status"){
        msgHTML.innerHTML +=

        `
        <li class="message-text status">
            <span class="hour">(${dados_msg[i].time})</span>
            <span class="person-name">${dados_msg[i].from }</span>
            <span>${dados_msg[i].text }</span>
        </li>
       
    
        `
    }

    else{
        msgHTML.innerHTML +=

        `
        <li class="message-text">
            <span class="hour">(${dados_msg[i].time})</span>
            <span class="person-name">${dados_msg[i].from }</span>
            <span>${dados_msg[i].text }</span>
        </li>
       
    
        `
    }
    

    
   
}
    let elementoQueQueroQueApareca = document.querySelector("ul li:last-child");
    elementoQueQueroQueApareca.scrollIntoView();
}