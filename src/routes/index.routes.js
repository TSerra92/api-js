const express = require("express")
const routes = express.Router()
const productsRoutes = require("./products.routes")

new productsRoutes(routes).init()

module.exports = routes