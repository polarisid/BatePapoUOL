let nome;
let idinterval;
let messages;
let msgHTML= document.querySelector(".messages-container");
let documento_person = document.querySelector(".persons-list");
let dados_msg;
let dados_msg2;
let msgENVIAR;
let dados_persons;
let dados_persons2;
let dados_nome_direct = "Todos";
let dados_type_message = "message";

document.addEventListener('keypress', function(e){
    if(e.which == 13){
        enviarMSG()
    }
 }, false); ///enviar com a tecla enter


let tipo_envio;
document.querySelector(".public").click(); // para resolver o bug do selecionável na área

function entry(){
    let nome1 = document.querySelector(".login-page input");
    let bina = document.querySelector(".login-page");
    bina.classList.add("escondido") 
    nome=nome1.value   
    enviarNome(nome);
    
}
function enviarMSG(){
    msgENVIAR= document.querySelector(".input-box");
    
    
    const promisses = axios.post("https://mock-api.driven.com.br/api/v4/uol/messages", 
     {
        from: nome,
        to: dados_nome_direct,
        text: msgENVIAR.value,
        type: dados_type_message // ou "private_message" para o bônus
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
   let interval = setInterval(atualizarpessoas, 10000);
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
    
    if(dados_msg2==undefined){ /// assim que entra na sala
        dados_msg2=dados_msg
        for(var i = 0;i<(dados_msg.length);i++){
            if(dados_msg[i].type =="status"){
                msgHTML.innerHTML +=
        
                `
                <li class="message-text status ">
                    <span class="hour">(${dados_msg[i].time})</span>
                    <span class="person-name">${dados_msg[i].from }</span>
                    <span>${dados_msg[i].text }</span>
                </li>
                `
            }
        
            else{
                msgHTML.innerHTML +=
                `
                <li class="message-text data-identifier="message"">
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
    
    if((dados_msg[99].time)!=((dados_msg2[99].time))){ //se tem atualização nas mensagens
        console.log("tem atualização")
        console.log(dados_msg[99])

        dados_msg2=dados_msg;
        msgHTML.innerHTML =""
        for(var i = 0;i<(dados_msg.length);i++){
        if(dados_msg[i].type =="status"){
            msgHTML.innerHTML +=
            `
            <li class="message-text status ">
                <span class="hour">(${dados_msg[i].time})</span>
                <span class="person-name">${dados_msg[i].from}</span>
                <span>${dados_msg[i].text }</span>
            </li>
            `
        }

        else if(dados_msg[i].type =="message"){
            msgHTML.innerHTML +=
            `
            <li class="message-text" data-identifier="message">
                <span class="hour">(${dados_msg[i].time})</span>
                <span class="person-name">${dados_msg[i].from} </span>
                <p> para <span> </span></p>
                <span class="person-name"> ${dados_msg[i].to} </span>
                <span>${dados_msg[i].text }</span>
            </li>
            `
        }
        else if(dados_msg[i].to==nome && dados_msg[i].type=="private_message"){
            msgHTML.innerHTML +=
            `
            <li class="message-text private" data-identifier="message"">
                <span class="hour">(${dados_msg[i].time})</span>
                <span class="person-name">${dados_msg[i].from}</span>
                <p> reservadamente para  <span> </span> </p>
                <span class="person-name"> ${dados_msg[i].to}</span>
                <span>${dados_msg[i].text}</span>
            </li>
            `
        }
        else if(dados_msg[i].from==nome && dados_msg[i].type=="private_message" ){
            msgHTML.innerHTML +=
            `
            <li class="message-text private" data-identifier="message"">
                <span class="hour">(${dados_msg[i].time})</span>
                <span class="person-name">${dados_msg[i].from}</span>
                <p> reservadamente para  <span> </span> </p>
                <span class="person-name"> ${dados_msg[i].to} </span>
                <span>${dados_msg[i].text}</span>
            </li>
            `
        }
        /*else if(dados_msg[i].from==nome && dados_msg[i].type =="message" ){
            msgHTML.innerHTML +=
            `
            <li class="message-text" data-identifier="message"">
                <span class="hour">(${dados_msg[i].time})</span>
                <span class="person-name">${dados_msg[i].from}</span>
                <p> reservadamente para  <span> </span> </p>
                <span class="person-name"> ${dados_msg[i].to} </span>
                <span>${dados_msg[i].text}</span>
            </li>
            `
        }*/

        }
        let elementoQueQueroQueApareca = document.querySelector("ul li:last-child");
        elementoQueQueroQueApareca.scrollIntoView();

    }
    else{ // se não tem ele não executa atuzalização nem scroll into-view
        console.log("n tem atualização")
    }

}
function exibeLateral(){
    let menulateral = document.querySelector("aside");
    menulateral.classList.toggle("escondido")
    let promisseperson=axios.get("https://mock-api.driven.com.br/api/v4/uol/participants");
    promisseperson.then(pegarpessoas)
    promisseperson.catch(tratarFalha)
    
}
function pegarpessoas(resposta1){

    dados_persons =resposta1.data;
    if(dados_persons2==undefined){dados_persons2=dados_persons;}

    //validarDiferenca(dados_persons2,dados_persons);
    documento_person.innerHTML="";

    for(let i=0; i<(dados_persons.length);i++){

        if(dados_persons[i].name==nome){
            documento_person.innerHTML+=`
            <li class="person-in-list" >
                <div class="left-content">
                    <ion-icon name="person-circle"></ion-icon>
                    <p class="name-person-list">${dados_persons[i].name}</p>
                </div>
            <ion-icon class = "icon-check1" name="checkmark"></ion-icon>
            </li>
            `;
        }

        else{
            documento_person.innerHTML+=`
            <li class="person-in-list" onclick="selectionPerson(this)">
                <div class="left-content">
                    <ion-icon name="person-circle"></ion-icon>
                    <p class="name-person-list">${dados_persons[i].name}</p>
                </div>
            <ion-icon class = "icon-check1" name="checkmark"></ion-icon>
            </li>
            `;
        }



    }
    dados_persons2=dados_persons;
    
}

function selectionType(element){
    
    let type_message = document.querySelector(".icon-check.visible");
    if(type_message!=null){
        type_message.classList.remove("visible")
    }
    element.querySelector("ion-icon.icon-check").classList.add("visible")
    if(element.className=="public"){
        dados_type_message = "message"
    }
    else{
        if(dados_nome_direct != "Todos"){        dados_type_message = "private_message"}
        else{dados_type_message = "message"}
    }
    
}
function fora(){
    let menulateral = document.querySelector("aside");
    menulateral.classList.add("escondido")
}

function atualizarpessoas(){
    let promisseperson=axios.get("https://mock-api.driven.com.br/api/v4/uol/participants");
    promisseperson.then(pegarpessoas)
    promisseperson.catch(tratarFalha)
}


function selectionPerson(elemento){
    let person_div= document.querySelector("ion-icon.icon-check1.visible");
    if(person_div!=null){
        person_div.classList.remove("visible")
    }
    elemento.querySelector("ion-icon.icon-check1").classList.add("visible")
    dados_nome_direct = elemento.querySelector("p").innerHTML;
    tipo_envio=document.querySelector("span.tipo-envio")
    tipo_envio.innerHTML="Enviando para "+ dados_nome_direct; 

}

function validarDiferenca(r1,r2) {
    
    var apenasNoR1 = r1.filter(function (element, index, array) {
        if(r2.indexOf(element) == -1)
            return element;
    });

    var apenasNoR2 = r2.filter(function (element, index, array) {
        if(r1.indexOf(element) == -1)
            return element;
    });

    var todasAsDiferencas = apenasNoR1.concat(apenasNoR2);

    console.log(todasAsDiferencas);
    return todasAsDiferencas;
}