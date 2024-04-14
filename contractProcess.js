const {ethers} = require('ethers')
const fs = require('fs')
priv = JSON.parse(fs.readFileSync('./private.json', 'utf-8'))

let contractAddress = ""
let contract = 0
function set_contract(address) {
    contractAddress = address
    let provider = new ethers.providers.InfuraProvider('sepolia', priv.infura)
    let abi = JSON.parse(fs.readFileSync('./abi.json', 'utf-8'))
    const signer = new ethers.Wallet(priv.wallet, provider);
    contract = new ethers.Contract(contractAddress, abi, signer)
}




async function del_by_id(id) {
    id = Number(id)
    await contract.del(id, {gasLimit: 3000000})
}

async function claim_by_id(ad, id){
    id = Number(id)
    await contract.claim(ad, id)
}



module.exports = {
    set_contract: set_contract,
    del_by_id: del_by_id,
    claim_by_id: claim_by_id
}
