const express = require('express')
const app = express()
app.use(express.json())

//GET http://localhost:3000/oi
app.get('/oi', (req, res) => {
    res.send('oi')
})

let filmes = [
    {
        titulo: "Trem-Bala",
        sinopse: "Em um trem-bala indo rapidamente de Tóquio a Morioka, cinco assassinos profissionais descobrem que possuem o mesmo objetivo."
    },
    {
        titulo: "Drive",
        sinopse: "Um habilidoso motorista, que é dublê em cenas de perseguição em filmes de Hollywood, também usa seu talento no volante para ser piloto de fuga em assaltos. Seu estilo de vida solitário e misterioso começa a mudar no momento em que se apaixona por uma mulher cujo marido está prestes a sair da prisão. Enquanto isso, o chefe da sua oficina mecânica está tentando organizar uma corrida com dinheiro sujo."
    }
]
app.get('/filmes', (req, res) => {
    res.json(filmes)
})

app.post("/filmes", (req, res) => {
    //obtém os dados enviados pelo cliente
    const titulo = req.body.titulo
    const sinopse = req.body.sinopse
    //monta um objeto agrupando os dados. Ele representa um novo filme
    const filme = { titulo: titulo, sinopse: sinopse }
    //adiciona o novo filme à base
    filmes.push(filme)
    //responde ao cliente. Aqui, optamos por devolver a base inteira ao cliente, embora não seja obrigatório.
    res.json(filmes)
})
app.listen(3000, () => console.log("up and running"))