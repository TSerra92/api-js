const fs = require("fs")
const fspromises = require("fs").promises

//Função para dar update no arquivo
async function createUpdateFile(path, obj){
    fs.writeFile(path, JSON.stringify(obj), (err) =>{
        if(err){
            return false
        }else{
            return true
        }
    })
}

//Open le o arquivo e extrai o array
function openFile(path){
        const data = fs.readFileSync(path, {encoding: 'utf8'})
        if(!data){
            return false
        }
        console.log(data)
        return JSON.parse(data)

}

module.exports = {
    openFile,
    createUpdateFile
}
