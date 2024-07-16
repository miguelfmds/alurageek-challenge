import { servicosProdutos } from "../servicos/servicos_produto.js";

const produtoMenu = document.querySelector("[data-produto]");
const form = document.querySelector("[data-form]");

function criarCard(nome, preco, imagem, id) {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
    <div class="imag_container">
        <img class="card_img" src="${imagem}"  alt="${nome}">
    </div>
    <div class="Img_info">
        <p>${nome}</p>
        <div class="card_valor">
            <p>R$${preco}</p>
            <button class="butao_delete" data-id="${id}">
                <img src="img/lixeira.png" alt="lixeira">
            </button>
        </div>
    </div>
    `;

    const cardEliminar = card.querySelector(".butao_delete");
    cardEliminar.addEventListener("click", () => {
        servicosProdutos.eliminarProduto(id)
            .then(() => {
                card.remove();
            })
            .catch(er => console.log(er));
    });

    produtoMenu.appendChild(card);
    return card;
}

const listaRendar = async () => {
    try {
        const listaProduto = await servicosProdutos.listaProduto();

        listaProduto.forEach((produto) => {
            produtoMenu.appendChild(
                criarCard(produto.nome, produto.preco, produto.imagem, produto.id)
            );
        });

    } catch (error) {
        console.log(error);
    }
};

form.addEventListener("submit", (event) => {
    event.preventDefault();

    console.log("Formulário enviado!");

    const nome = document.querySelector("[data-name]").value;
    const preco = document.querySelector("[data-preco]").value;
    const imagem = document.querySelector("[data-imagem]").value;

    servicosProdutos
        .criarProduto(nome, preco, imagem)
        .then((res) => {
            console.log(res);
            produtoMenu.appendChild(criarCard(nome, preco, imagem, res.id));
        })
        .catch((er) => console.log(er));
});

form.addEventListener("reset", (event) => {
    event.preventDefault();

    document.querySelector("[data-name]").value = "";
    document.querySelector("[data-preco]").value = "";
    document.querySelector("[data-imagem]").value = "";

    return;
});

listaRendar();
