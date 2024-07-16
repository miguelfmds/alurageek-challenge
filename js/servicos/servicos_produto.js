const listaProduto = async () => {
        return fetch("https://json-test-rosy.vercel.app/produtos")
            .then((res) => res.json())
            .catch((err) => console.log(err));
    };

const criarProduto = async (nome, preco, imagem) => {
    return fetch("https://json-test-rosy.vercel.app/produtos", {
        method: "POST",
        headers: {"Content-Type": "application/json",},
        body: JSON.stringify({nome ,preco, imagem,}),
    })
        .then((res) => res.json())
        .catch((err) => console.log(err));
};

const eliminarProduto = async (id) => {
    return fetch(`${"https://json-test-rosy.vercel.app/produtos"}/${id}`, {
        method: "DELETE"
    })
        .then((res) => res.json())
        .catch((err) => console.log(err));
};

export const servicosProdutos = {
    listaProduto,
    criarProduto,
    eliminarProduto
};
