const formulario = document.getElementById("formulario");
formulario.onsubmit = salvarCard;

let dados = JSON.parse(localStorage.getItem("Dados")) || [];

function salvarCard(event) {
  event.preventDefault();

  const titulo = document.getElementById("titulo").value;
  const linguagem = document.getElementById("linguagem").value;
  const categoria = document.getElementById("categoria").value;
  const descricao = document.getElementById("descricao").value;
  const video = document.getElementById("video").value;

  const card = {
    id: new Date().getTime(),
    titulo: titulo,
    linguagem: linguagem,
    categoria: categoria,
    descricao: descricao,
    video: video,
  };

  dados.push(card);
  localStorage.setItem("Dados", JSON.stringify(dados));

  sTotal();
  sFront();
  sBack();
  sFull();
  sSoft();
  criarCard();
  alert("Card cadastrado com sucesso!");
}

function criarCard() {
  dados = JSON.parse(localStorage.getItem("Dados")) || [];
  const listaCards = document.getElementById("cards");
  let multCards = "";

  dados.forEach((element) => {
    multCards += ` <div id="cardInfo">
    <li>
    <h2 id="cardTitulo">${element.titulo}</h2>
    <div class="cardSkill">
      <p> <strong> Linguagem/Skill:</strong></p>
      <span>${element.linguagem}</span>
    </div>
    <div class="cardCategoria">
      <p> <strong>Categoria:</strong></p>
      <span>${element.categoria}</span>
    </div>
    <div class="cardDescricao">
      <p>${element.descricao}</p>
    </div>
    <div class="cardBotoes">
    <button id="excluir" onclick="excluir(${element.id})"><img src="./source/img/icons/excluir.png" alt=""></button>
    <button id="editar" onclick="editar(${element.id})"><img src="./source/img/icons/editar.png" alt=""></button>
    <a href="${element.video}" target="_blank"><button id="linkVideo"><img src="./source/img/icons/video.png" alt=""></button></a>
    </div>
    </li>
  </div>`;
  });

  listaCards.innerHTML = multCards;
}

function excluir(elementId) {
  if (confirm(`Deseja deletar o card?`)) {
    dados = dados.filter(({ id }) => {
      return id != elementId;
    });
    localStorage.setItem("Dados", JSON.stringify(dados));
    sFront();
    sTotal();
    sBack();
    sFull();
    sSoft();
    criarCard();
    alert("Card deletado com sucesso!");
  }
}

criarCard();

// function editar(elementId) {
//   let edicao = document.getElementById("cards");
//   let edit = edicao.firstElementChild;
//   let redirecionar = document.;
//   redirecionar.type = "text";
//   redirecionar.value = edicao.textContent;
//   edicao.insertBefore(redirecionar, edit);
// }

// Funções Estatíticas - Card Contador

function sTotal() {
  let contadorCards = dados.length;
  let contadorTotal = document.getElementById("stotal");
  contadorTotal.innerText = contadorCards;
}

sTotal();

function frontEnd(element) {
  return element.categoria == "FrontEnd";
}

function sFront() {
  let contadorFront = dados.filter(frontEnd);
  let contadorTotalFront = contadorFront.length;
  let contadorTotal = document.getElementById("sfront");
  contadorTotal.innerText = contadorTotalFront;
}
sFront();

function backEnd(element) {
  return element.categoria == "BackEnd";
}

function sBack() {
  let contadorBack = dados.filter(backEnd);
  let contadorTotalBack = contadorBack.length;
  let contadorTotal = document.getElementById("sback");
  contadorTotal.innerText = contadorTotalBack;
}
sBack();

function fullStack(element) {
  return element.categoria == "FullStack";
}

function sFull() {
  let contadorFull = dados.filter(fullStack);
  let contadorTotalFull = contadorFull.length;
  let contadorTotal = document.getElementById("sfull");
  contadorTotal.innerText = contadorTotalFull;
}
sFull();

function softSkill(element) {
  return element.categoria == "SoftSkill";
}

function sSoft() {
  let contadorSoft = dados.filter(softSkill);
  let contadorTotalSoft = contadorSoft.length;
  let contadorTotal = document.getElementById("ssoft");
  contadorTotal.innerText = contadorTotalSoft;
}
sSoft();

const busca = document.getElementById("txtBusca");
busca.addEventListener("input", (e) => {
  const filtroBusca = e.target.value.toLowerCase();
  const cardFiltrado = dados.filter((element) => {
    return element.titulo.toLowerCase().includes(filtroBusca);
  });
  console.log(cardFiltrado);
});
