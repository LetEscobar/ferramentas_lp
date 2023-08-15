//configuracao do express
const express = require('express')
const app = express()
const port = 3000

//deconding / enconding
app.use(express.urlencoded({ extended: true }))

//array com 3 objetos
let products = [
    {
        id: 0,
        name: 'Project 1'
    },
    {
        id: 1,
        name: 'Project 2'
    },
    {
        id: 2,
        name: 'Project 3'
    }
]

/*
-Configuracao de rotas
-GET, PUT, DELETE, POST
*/
app.get('/', (req, res) => {
    res.send('Meu express está rodando...')
})

//products
app.get('/api', (req, res) => {
    //buscar em bd (repositorio)
    res.json(products)
})

app.get('/api/:id', (req, res) => {
    //:id é um parametro que está sendo recebido de product
    res.send('ID = ' + req.params.id) //exibe o parâmetro recebido
})

app.get('/api/products/:id', (req, res) => {
    const id = Number(req.params.id) //convertendo em number
    const product = products.find(product => product.id === id) //buscando o produto pelo id

    // Mostrando o erro 404 no html:
    // if (!product) {
    //     return res.status(404).send('Product not found!')
    // }
    if (!product) {
        return res
            .status(404)
            .json({ status: 404, message: 'Product not found!' })
    }

    res.json(product)
})

app.post('/api', (req, res) => {
    let name = req.body.name
    console.log(`name is ${name}`)

    products.push({ id: products.length + 1, name: name })

    return res.json(products)
})

app.put('/api/products/:id', (req, res) => {
    let id = Number(req.params.id)
    // let name = req.body.name
    let { name } = req.body

    const product = products.find(product => product.id === id)

    if (!product) {
        return res
            .status(404)
            .json({ status: 404, message: 'Product not found!' })
    }

    products[id].name = name

    return res.json(products[id])
})

app.delete('/api/products/:id', (req, res) => {
    let id = Number(req.params.id)

    const product = products.find(product => product.id === id)

    if (!product)
        return res.status(404).json({
            status: 404,
            message: 'Product not found!'
        })

    products = products.filter(product => product.id !== id)

    return res.json({
        status: 204,
        message: 'Product deleted!'
    })
})

/*
-Configuracao da porta
*/
app.listen(port, () => {
    console.log(`Express is runnig on port ${port}`)
})
