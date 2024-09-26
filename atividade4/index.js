const express = require('express');
const app = express();
const port = 3000;

let estoque = [];

app.get('/adicionar/:id/:nome/:qtd', (req, res) => {
    const { id, nome, qtd } = req.params;

    const produtoExistente = estoque.find(produto => produto.id === id);

    if (produtoExistente) {
        return res.send(`Produto com ID ${id} já existente no estoque.`);
    }

    estoque.push({ id: id.toString(), nome, qtd: parseInt(qtd) });
    res.send(`Produto ${nome} adicionado com sucesso!`);
});

app.get('/listar', (req, res) => {
    if (estoque.length === 0) {
        return res.send('Estoque vazio.');
    }
    res.json(estoque);
});

app.get('/remover/:id', (req, res) => {
    const { id } = req.params;

    const index = estoque.findIndex(produto => produto.id === id.toString());

    if (index === -1) {
        return res.send('Produto não encontrado.');
    }

    estoque.splice(index, 1);
    res.send(`Produto com ID ${id} removido!`);
});

app.get('/editar/:id/:qtd', (req, res) => {
    const { id, qtd } = req.params;

    const produto = estoque.find(produto => produto.id === id.toString());

    if (!produto) {
        return res.send('Produto não encontrado.');
    }

    produto.qtd = parseInt(qtd);
    res.send(`Quantidade do produto com ID ${id} atualizada para ${qtd}.`);
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
