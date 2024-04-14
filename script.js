const express = require('express')
const blockProcess = require("./blockProcess")
const contractProcess = require('./contractProcess')
const fs = require('fs')
const {getBlockByID} = require("./blockProcess");

let contractAddress = "0x54C49807b41B326F66BD2eaceCa212CD69ee8547"
blockProcess.set_id(3)
contractProcess.set_contract(contractAddress)


const PORT = 8080

const app = express()

app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: false}))
app.use(express.static('stat'))


app.get('/', (req, res) => {
    res.render('index')
})

app.get('/test', (req, res) => {
    res.render('test')
})

app.get('/create', (req, res) => {
    res.render('create')
})

app.get('/QR/:id', (req, res) => {
    let id = req.params.id
    let data = getBlockByID(id)
    res.render('QR', {d: data})
})

app.get('/manage', (req, res) => {
    let block = JSON.parse(fs.readFileSync("blocks.json", "utf-8")).blocks
    res.render('manage', {title: 'block', b: block})
})

app.post('/manage', async (req, res) => {
    await contractProcess.del_by_id(Object.keys(JSON.parse(JSON.stringify(req.body)))[0])
    blockProcess.deleteBlock(Object.keys(JSON.parse(JSON.stringify(req.body)))[0])
    let block = JSON.parse(fs.readFileSync("blocks.json", "utf-8")).blocks
    res.render('manage', {title: 'block', b: block})
})

app.post('/generation', async (req, res) => {
    await blockProcess.addBlock(req.body.amount, req.body.disc)
    let address = req.body.ad
    let val = req.body.amount
    res.render('generation', {ad: address, amo: val, con:contractAddress})

})

app.post('/get/:id', async (req, res) => {
    let address = req.body.ad
    let id = req.params.id
    await contractProcess.claim_by_id(address, id)
    blockProcess.deleteBlock(id)
    res.render('get')

})




app.listen(PORT, () => {
    console.log('Server started')
})