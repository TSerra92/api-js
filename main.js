// Importando 3 dependências: express, cors e helmet.
const express = require("express")
const cors = require("cors")
const helmet = require("helmet")
const routes = require("./src/routes/index.routes")
require('dotenv').config()

const port = process.env.PORT
// Instanciando o servidor na constant app através da função express().
const app = express()

// Configura o servidor para usar as dependências abaixo.
app.use(express.json())
app.use(cors()) //
app.use(helmet()) //Segurança

app.listen(port, () => console.log('APLICAÇÃO RODANDO NA PORTA 4001'))

//Configura o servidor para  usar as rotas. 
app.use(routes)