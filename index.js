const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const app = express()
app.use(express.json())
app.use(cors())

const Filme = mongoose.model("Filme", mongoose.Schema({
    titulo: { type: String },
    sinopse: { type: String }
}))

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
app.get('/filmes', async(req, res) => {
    const filmes = await Filme.find()
    res.json(filmes)
})

app.post("/filmes", async (req, res) => {
    //obtém os dados enviados pelo cliente
    const titulo = req.body.titulo
    const sinopse = req.body.sinopse
    const filme = new Filme({ titulo: titulo, sinopse: sinopse })

    await filme.save()
    const filmes = await Filme.find()
    res.json(filmes)
})

async function conectarAoBanco() {
    await mongoose.connect(`mongodb+srv://peoliveirapinto:UfF6yXgoJUt8gX2r@cluster0.y7ta6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
`)
}

app.listen(3000, () => {
    try {
        conectarAoBanco()
        console.log("up and running")
    }
    catch (e) {
        console.log('erro na conexão ', e)
    }
})