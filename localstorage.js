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

  criarCard();
}

function criarCard() {
  dados = JSON.parse(localStorage.getItem("Dados")) || [];
  const listaCards = document.getElementById("cards");
  let multCards = "";

  dados.forEach((element) => {
    multCards += ` <div id="cardInfo">
    <li>
    <h2>${element.titulo}</h2>
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
    <button id="editar" onclick="editar"><img src="./source/img/icons/editar.png" alt=""></button>
    <a href="${element.video}" target="_blank"><button id="video"><img src="./source/img/icons/video.png" alt=""></button></a>
    </div>
    </li>
  </div>`;
  });
  listaCards.innerHTML = multCards;
}

function excluir(elementId) {
  alert(`${elementId}`);
  dados = dados.filter(({ id }) => {
    return id != elementId;
  });
  localStorage.setItem("Dados", JSON.stringify(dados));
  criarCard();
}

criarCard();
