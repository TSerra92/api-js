
//Função que verifica se o payload do request está válido.
async function validaPayloadProducts(reqBody){
    let erros = []
    const {name, price} = reqBody
    if(name == '' || name == null || name == undefined){
        erros.push('O nome do produto não pode ser vazio.')
    }

    if(typeof name != "string"){
        erros.push('O nome do produto deve ser do tipo string.')
    }
    if(price == '' || price == null || price == undefined){
        erros.push('O preço do produto não pode ser vazio.')
    }

    if(typeof price != "number"){
        erros.push('O preço do produto deve ser do tipo number.')
    }

    return erros
}

module.exports = {validaPayloadProducts}