const fs = require("fs")
const { randomUUID } = require("crypto")
const filesHelpers = require("../helpers/files.helpers")
const productServices = require("../services/products.services")



module.exports = class ProductsController{
    static async registerProduct(request, response){
        try{
            console.log("CHAMADA-ENDPOINT - REGISTER-PRODUCT - /products");

            //Instancia os dados do body da requisição (Desestruturação)
            const { name, price } = request.body;

            //Chama função do services responsável pela validação dos dados da requisição.
            const validaPayload = await productServices.validaPayloadProducts(request.body);

            //Verifica se retornou algum erro, em caso positivo, retorna os erros.
            if(validaPayload.length > 0){
                return response.status(422).send({
                    success: false,
                    controller: 'Products',
                    action: 'RegisterProduct',
                    message: 'Falha na validação do payload da requisição',
                    result: validaPayload
    
                })
            }

            //Chama função do helper responsável pela leitura de arquivos.
            let products = await filesHelpers.openFile("./src/data/products.json")
            
            //Verifica se a função openFile foi bem sucedida
            if(products === false){
                products = []
                await filesHelpers.createUpdateFile("./src/data/products.json", products)
            }
            
            //Instancia objeto product, que será incluido no array products.
            const product = {
                name,
                price,
                id: randomUUID()
            }

            //Inclui o objeto product no array products.
            products.push(product)

            //Chama a função do helper responsavel pela atualização dos dados do arquivo.
            const createUpdateFile = await filesHelpers.createUpdateFile("./src/data/products.json", products)

            //Verifica se a  função createUpdate retornou falso, caso aja algum problema.
            if(createUpdateFile === false){
                return response.status(422).send({
                    success: false,
                    controller: 'Products',
                    action: 'RegisterProduct',
                    message: 'Falha na criação/atualização do arquivo.',
                    result: null
                })
            }
            
            //Quando passar por todas as validações, retorna uma mensagem de sucesso com o produto registrado.
            return response.status(200).send({
                success: true,
                controller: 'Products',
                action: 'RegisterProduct',
                message: 'Produto cadastrado com sucesso.',
                result: product
            })

        }catch(err){
            console.log(`REGISTER-PRODUCT - CATCH - FALHA AO REALIZAR A REQUISIÇÃO --> ${err}`)
            return response.status(400).send({
                success: false,
                error: err
            })
        }
    }

    static async showProductsTable(request, response){
        try{
            console.log("CHAMADA-ENDPOINT - SHOW-PRODUCTS-TABLE - /products");
            //Chama função do helper responsável pela leitura de arquivos.
            const products = await filesHelpers.openFile("./src/data/products.json")
            //Verifica se a função openFile foi bem sucedida
            if(products === false){
                return response.status(422).send({
                    success: false,
                    controller: 'Products',
                    action: 'showProductsTable',
                    message: 'Falha ao abrir/ler o arquivo.',
                    result: null
                })
            }
            //Quando passar por todas as validações, retorna uma mensagem de sucesso com o produto registrado.
            return response.status(200).send({
                success: true,
                controller: 'Products',
                action: 'showProductsTable',
                message: 'Tabela de produtos retornada com sucesso.',
                result: products
            })

        } catch(err){
            console.log(`SHOW-PRODUCTS-TABLE - CATCH - FALHA AO REALIZAR A REQUISIÇÃO --> ${err}`)
            return response.status(400).send({
                success: false,
                error: err
            })
        }
    }

    static async showProductById(request, response){
        try{
            console.log("CHAMADA-ENDPOINT - SHOW-PRODUCT-BY-ID - /products");

            //Abre o arquivo com a tabela de produtos.
            const products = await filesHelpers.openFile("./src/data/products.json")
        
            //Verifica se a função openFile foi bem sucedida
            if(products === false){
                return response.status(422).send({
                    success: false,
                    controller: 'Products',
                    action: 'showProductById',
                    message: 'Falha ao abrir/ler o arquivo.',
                    result: null
                })
            }
            //Instancia o id do produto que é passado na URL na váriavel id
            const { id } = request.params;

            //Procura o produto pelo ID e instancia na variável product.
            const product = products.find((product) => product.id === id);
            
            //Verifca se o produto foi encontrado
            if(!product){
                return response.status(422).send({
                    success: false,
                    controller: 'Products',
                    action: 'showProductById',
                    message: 'Não foi possível encontrar o ID informado.',
                    result: null
                })
            }

            //Quando passar por todas as validações, retorna uma mensagem de sucesso com o produto registrado.
            return response.status(200).send({
                success: true,
                controller: 'Products',
                action: 'showProductById',
                message: 'Informações do produto retornado com sucesso. ',
                result: product
            })
        }catch(err){
            console.log(`SHOW-PRODUCT-BY-ID - CATCH - FALHA AO REALIZAR A REQUISIÇÃO --> ${err}`)
            return response.status(400).send({
                success: false,
                error: err
            })
        }

    }

    static async updateProduct(request, response){
        try{
            console.log("CHAMADA-ENDPOINT - UPDATE-PRODUCT - /products");
            //Chama função do services responsável pela validação dos dados da requisição.
            const validaPayload = await productServices.validaPayloadProducts(request.body);

            //Verifica se retornou algum erro, em caso positivo, retorna os erros.
            if(validaPayload.length > 0){
                return response.status(422).send({
                    success: false,
                    controller: 'Products',
                    action: 'RegisterProduct',
                    message: 'Falha na validação do payload da requisição',
                    result: validaPayload
    
                })
            }

            //Chama função do helper responsável pela leitura de arquivos.
            let products = await filesHelpers.openFile("./src/data/products.json")

            //Verifica se a função openFile foi bem sucedida
            if(products === false){
                return response.status(422).send({
                    success: false,
                    controller: 'Products',
                    action: 'updateProduct',
                    message: 'Falha ao abrir/ler o arquivo.',
                    result: null
                })
            }
            //Instancia o id do produto que é passado na URL na váriavel id
            const { id } = request.params;

            //Instancia o payload do request nas váriaveis name e price (Desestruturação)
            const {name, price} = request.body

            //Encontra o produto através do índice.
            const productIndex = products.findIndex(product => product.id === id);

            //Verifica se o produto foi encontrado.
            if(productIndex < 0){
                return response.status(422).send({
                    success: false,
                    controller: 'Products',
                    action: 'updateProduct',
                    message: 'Produto não encontrado.',
                    result: null
                })
            }
            
            //Edita o produto usando.
            products[productIndex] = {
                ...products[productIndex],
                name,
                price
            };

            //Atualiza o arquivo com o array Products já editado.
            filesHelpers.createUpdateFile("./src/data/products.json", products)

            return response.status(200).send({
                success: true,
                controller: 'Products',
                action: 'updateProduct',
                message: 'Informações do produto retornado com sucesso. ',
                result: products
            })
        }catch(err){
            console.log(`UPDATE-PRODUCT - CATCH - FALHA AO REALIZAR A REQUISIÇÃO --> ${err}`)
            return response.status(400).send({
                success: false,
                error: err
            })
        }
    }

    static async deleteProduct(request, response){
        try{
            console.log("CHAMADA-ENDPOINT - DELETE-PRODUCT - /products");
            
            //Chama função do helper responsável pela leitura de arquivos.
            let products = await filesHelpers.openFile("./src/data/products.json")

            //Verifica se a função openFile foi bem sucedida
            if(products === false){
                products = []
            }
            //Instancia o id do produto que é passado na URL na váriavel id
            const { id } = request.params

            //Encontra o produto através do índice.
            const productIndex = products.findIndex(product => product.id === id);

            //Verifica se o produto foi encontrado.
            if(productIndex < 0){
                return response.status(422).send({
                    success: false,
                    controller: 'Products',
                    action: 'updateProduct',
                    message: 'Produto não encontrado.',
                    result: null
                })
            }

            //Delete o produto do array products.
            products.splice(productIndex, 1);

            //Edita o arquivo com o array já atualizado.
            filesHelpers.createUpdateFile("./src/data/products.json", products)

            return response.status(200).send({
                success: true,
                controller: 'Products',
                action: 'deleteProduct',
                message: 'Informações do produto retornado com sucesso. ',
                result: products
            })
        }catch(err){
            console.log(`DELETE-PRODUCT - CATCH - FALHA AO REALIZAR A REQUISIÇÃO --> ${err}`)
            return response.status(400).send({
                success: false,
                error: err
            })
        }
        
    }


}

