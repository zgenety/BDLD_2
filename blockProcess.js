const fs = require('fs')
const QRCode = require('qrcode');

let id = -1

function set_id(n){
    id = n
}

async function addBlock(amount, disc) {
    id++
    let link = `http://localhost:8080/QR/${id}`
    let src = await QRCode.toDataURL(`http://localhost:8080/QR/${id}`);

    let obj = {'id': id, 'amount': amount, "disc": disc, 'link': link, "src": src}

    let data = JSON.parse(fs.readFileSync("blocks.json", "utf-8"))
    data.blocks.push(obj)
    fs.writeFileSync('blocks.json', JSON.stringify(data))
}

function deleteBlock(id) {
    id = Number(id)
    let data = JSON.parse(fs.readFileSync("blocks.json", "utf-8"))
    let del = 0
    for (n = 0; n < data.blocks.length; n++) {
        if (data.blocks[n].id == id) {
            del = n
        }
    }
    data.blocks.splice(del, 1)
    fs.writeFileSync('blocks.json', JSON.stringify(data))
}

function getBlockByID(id){
    id = Number(id)

    let data = JSON.parse(fs.readFileSync("blocks.json", "utf-8"))

    for (n = 0; n < data.blocks.length; n++) {
        if (data.blocks[n].id == id) {
            return data.blocks[n]
        }
    }
}


module.exports = {
    addBlock: addBlock,
    deleteBlock: deleteBlock,
    getBlockByID: getBlockByID,
    set_id: set_id
}