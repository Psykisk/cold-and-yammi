const express = require('express')
require('dotenv').config()
const {Sequelize} = require('sequelize')
const Flavour = require('./models/Flavours')


const app = express()

app.set('view engine', 'ejs')
app.use( express.static('public'))
app.use( express.urlencoded({extended: true}))

// const db = new Sequelize('sqlite://database/icecreams.sqlite')


app.get('/', async (req, res) => {
    const topFlavour = await Flavour.findAll({
        limit: 5,
        order: [['totalVotes', 'DESC']]
    })
    res.render('index', {topFlavour})
})

app.get('/vote', async (req, res) => {
    const voteFlavour = await Flavour.findAll()
    res.render('voteForm', {voteFlavour})
})

app.get('/error', (req, res) => {
    res.render('error')
})

app.post('/vote', async (req, res) => {
    // const flavour = req.body.voteSelected
    // const email = req.body.email
    // const getEmail = await db.query('SELECT email FROM users', {type: Sequelize.QueryTypes.SELECT})
    // for(let i = 0; i < getEmail.length; i++){
    //     if(email === getEmail[i]){
    //         res.redirect('/error')
    //     }
    //     else {
    //         const voted = await db.query(`SELECT totalVotes FROM flavours WHERE title = '${flavour}'`, {type: Sequelize.QueryTypes.SELECT})
    //         const addVote = voted[0].totalVotes + 1
    //         await db.query(`UPDATE flavours SET totalVotes = ${addVote} WHERE title = '${flavour}'`, {type: Sequelize.QueryTypes.UPDATE})
    //         await db.query(`INSERT INTO users (email, flavour, voted) VALUES ('${email}', '${flavour}', '1')`, {type: Sequelize.QueryTypes.SELECT})
    //         }
    // } 
    res.redirect('/')
})

const PORT = 8080
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})