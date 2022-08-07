const formulario = document.getElementById("formulario");
formulario.onsubmit = salvarCard;

let dados = JSON.parse(localStorage.getItem("Dados")) || [];

let edicaoId;

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
  criarCard(dados);
  alert("Card cadastrado com sucesso!");
}

function criarCard(data) {
  // dados = JSON.parse(localStorage.getItem("Dados")) || [];
  const listaCards = document.getElementById("cards");
  let multCards = "";

  data.forEach((element) => {
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
    criarCard(dados);
    alert("Card deletado com sucesso!");
  }
}

criarCard(dados);

function editar(elementId) {
  if (confirm(`Deseja editar o card?`)) {
    const [editarFiltro] = dados.filter(({ id }) => {
      return id == elementId;
    });
    document.getElementById("titulo").value = editarFiltro.titulo;
    document.getElementById("linguagem").value = editarFiltro.linguagem;
    document.getElementById("categoria").value = editarFiltro.categoria;
    document.getElementById("descricao").value = editarFiltro.descricao;
    document.getElementById("video").value = editarFiltro.video;
    edicaoId = elementId;
    formulario.onsubmit = salvarEdicao;
  }
}

function salvarEdicao() {
  const novosDados = dados.map((dado) => {
    if (dado.id == edicaoId) {
      return {
        titulo: document.getElementById("titulo").value,
        linguagem: document.getElementById("linguagem").value,
        categoria: document.getElementById("categoria").value,
        descricao: document.getElementById("descricao").value,
        video: document.getElementById("video").value,
        id: edicaoId,
      };
    }
    return dado;
  });
  dados = novosDados;
  localStorage.setItem("Dados", JSON.stringify(novosDados));
  formulario.onsubmit = salvarCard;
  edicaoId = "";
  alert("Card editado com sucesso!");
  criarCard(dados);
}

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
  criarCard(cardFiltrado);
});
