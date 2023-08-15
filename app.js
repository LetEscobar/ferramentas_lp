//configuracao do express
const express = require('express')
const app = express()
const port = 3000

//deconding / enconding
app.use(express.urlencoded({extended: true}))

//array com 3 objetos
const products = [
    {
        id: 1,
        name: 'Project 1'
    },
    {
        id: 2,
        name: 'Project 2'
    },
    {
        id: 3,
        name: 'Project 3'
    }
]

/*
-Configuracao de rotas
-GET, PUT, DELETE, POST
*/
app.get('/', (req, res) => {
    res.send('Meu expressa esta rodando...')
})

//products
app.get('/api', (req, res) => {
    //buscar em bd (repositorio)
    res.json(products)
})

app.post('/api', (req, res) => {
    let name = req.body.name
    console.log(`name is ${name}`)

    products.push({ id: products.length + 1, name: name})

    return res.json(products)
})


/*
-Configuracao da porta
*/
app.listen(port, () => {
    console.log(`Express is runnig on port ${port}`)
})