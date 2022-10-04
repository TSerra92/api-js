const productsController = require("../controllers/products.controllers")



class ProductsRoutes{
    constructor(routes){
        this.routes = routes
    }
    init(){
        this.routes.post("/products", productsController.registerProduct),
        this.routes.get("/products", productsController.showProductsTable),
        this.routes.get("/products/:id", productsController.showProductById),
        this.routes.put("/products/:id", productsController.updateProduct),
        this.routes.delete("/products/:id", productsController.deleteProduct) 
    }
}




module.exports = ProductsRoutes