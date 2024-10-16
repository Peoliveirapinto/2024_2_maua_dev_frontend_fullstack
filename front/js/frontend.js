const protocolo = 'http://'
const baseURL = 'localhost:3000'
const filmesEndpoint = '/filmes'

function listarFilmes(filmes) {
    let tabela = document.querySelector('.filmes')
    let corpoTabela = tabela.getElementsByTagName('tbody')[0]
    corpoTabela.innerHTML = ""
    for (let filme of filmes) {
        let linha = corpoTabela.insertRow(0)
        let celulaTitulo = linha.insertCell(0)
        let celulaSinopse = linha.insertCell(1)
        celulaTitulo.innerHTML = filme.titulo
        celulaSinopse.innerHTML = filme.sinopse
    }
}

async function obterFilmes() {
    const URLcompleta = `${protocolo}${baseURL}${filmesEndpoint}`
    const filmes = (await axios.get(URLcompleta)).data
    listarFilmes(filmes)
}

async function cadastrarFilme() {
    const URLcompleta = `${protocolo}${baseURL}${filmesEndpoint}`
    let tituloFilme = document.querySelector('#tituloFilme')
    let sinopseFilme = document.querySelector('#sinopseFilme')
    let titulo = tituloFilme.value
    let sinopse = sinopseFilme.value
    if (titulo && sinopse) {
        tituloFilme.value = ""
        sinopseFilme.value = ""
        const filmes = (await axios.post(URLcompleta, { titulo, sinopse })).data
        listarFilmes(filmes)
    }
    else {
        let alert = document.querySelector('.alert')
        alert.classList.add('show')
        alert.classList.remove('d-none')
        setTimeout(() => {
            alert.classList.add('d-none')
            alert.classList.remove('show')
        }, 2000)
    }
}