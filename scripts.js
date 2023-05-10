const texto = document.querySelector("#texto");
const entrada = document.querySelector("#entrada");
const reiniciar = document.querySelector("#reiniciar");
const resultado = document.querySelector("#resultado");
const historico = document.querySelector("#historico");
const alternarTemaBtn = document.querySelector("#alternarTema");

const textos = [
    "Eu amo comer pizza", "Estou animado para a viagem",
    "Ela é uma ótima amiga", "O sol está brilhando hoje", 
    "Vamos ao cinema amanhã", "Ele é um excelente jogador de futebol", 
    "Preciso fazer compras no supermercado", "Estou com saudades da minha família", 
    "Adoro passear no parque", "Quero aprender a tocar guitarra", "Estou cansado de estudar", 
    "Vou fazer uma pausa para o café", "Que filme interessante!", "Vamos jantar fora esta noite", 
    "A festa foi muito divertida", "Gosto de ler antes de dormir", 
    "Preciso resolver esse problema urgentemente", "Que linda paisagem!", 
    "Adoro ouvir música no carro", "Vou tirar um cochilo depois do almoço", 
    "Ela é uma excelente cozinheira", "Vamos marcar um encontro", "Estou ansioso pelo fim de semana", 
    "Adoro viajar e conhecer novos lugares", "Preciso renovar meu guarda-roupa", 
    "Que delícia esse bolo de chocolate!", "Vou dar um passeio no parque", 
    "Estou com frio, preciso de um casaco", "Gosto de nadar no mar", 
    "Vamos organizar uma festa surpresa", "Quero aprender a dançar salsa", 
    "Eles são um casal muito fofo"
];

function novoTexto() {  
    const index = Math.floor(Math.random() * textos.length);
    texto.textContent = textos[index];
}

function atualizarTeste(){
    iniciar();
    if(entrada.value === texto.textContent){
       verificar()
    }
}

function iniciar() {
    const statusDoTeste = JSON.parse(localStorage.getItem("testeEmAndamento"));

    if(!statusDoTeste) {
        localStorage.setItem("tempoInicial", new Date().getTime());
        localStorage.setItem("testeEmAndamento", true);
    }
}

function verificar(){
    const tempoFinal = new Date().getTime();
    const tempoInicial = parseInt(localStorage.getItem("tempoInicial"));
    const tempoGasto = (tempoFinal - tempoInicial) / 1000;

    resultado.textContent = `Parabéns! Você levou ${tempoGasto} segundos!`;

    adicionarAoHistorico(texto.textContent, tempoGasto)

    localStorage.setItem("testeEmAndamento", false);
    entrada.value = "";
    novoTexto();
}

function adicionarAoHistorico(textoDigitado, tempoGasto){
    const itemHistorico = document.createElement("p")

    itemHistorico.textContent = `Texto "${textoDigitado}" - Tempo: ${tempoGasto}`
    historico.appendChild(itemHistorico);
}

function reiniciarTeste(){
    entrada.value =""
    resultado.textContent = ""
    novoTexto()
    localStorage.setItem("testeEmAndamento", false)
    historico.innerHTML ="";
}

function adicionarLocaStorage(chave, valor){

    localStorage.setItem(chave, valor)
}

function alternarTema(){
    const body = document.body

    body.classList.toggle("claro");
    body.classList.toggle("escuro");

    const tema = body.classList.contains('claro') ? 'claro' : 'escuro'
    adicionarLocaStorage("tema", tema)
}

window.addEventListener("load", function() {
    const tema = localStorage.getItem("tema")
    if(tema === null) return

    if(tema === "claro"){
        document.body.classList.remove("escuro");
        document.body.classList.add("claro");
      } else {
        document.body.classList.remove('claro')
        document.body.classList.add('escuro')
      }

})


entrada.addEventListener("keyup", atualizarTeste);
reiniciar.addEventListener("click", reiniciarTeste)
alternarTemaBtn.addEventListener("click", alternarTema);

novoTexto();