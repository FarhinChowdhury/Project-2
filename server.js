require( 'dotenv' ).config() // looks for .env ; process.env gets it's values

const express = require('express')
const apiRouter = require('./app/router/router')
const app = express()
const db = require('./app/models')
const fs = require('fs')
// const https = require('https')
// const privateKey = fs.readFileSync('./ssl/server.key', 'utf-8')
// const certificate = fs.readFileSync('./ssl/server.crt', 'utf-8')
const { pathToFileURL } = require('url')
// var credentials = {key: privateKey, cert: certificate}


const PORT = process.env.PORT || 8080



// for parsing incoming POST data
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// for serving all the normal html
app.use( express.static('public') )



// for routes
apiRouter(app)

// const httpsServer = https.createServer(credentials, app)

db.sequelize.sync({force:true}).then(function(){
    app.listen(PORT, function() {
        console.log( `Database (name=${process.env.DB_NAME}); Serving app on: http://localhost:${PORT}` )
    })
})

