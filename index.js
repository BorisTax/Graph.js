/* Server */
const express = require('express')
const http = require('http')

const path = require('path')
const config = require('config')
const cors = require('cors')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const _debug = require('debug')
const {router} = require('./routers')

var debug = _debug('server')

//var privateKey  = fs.readFileSync('cert/cert.key', 'utf8');
//var certificate = fs.readFileSync('cert/cert.crt', 'utf8');
//var credentials = {key: privateKey, cert: certificate};

var app = express()
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json({limit: config.bodyParserLimit}))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, '/build')))

app.use('/', router)

app.use(function (req, res) {
    res.sendFile(path.join(__dirname, 'index.html'))
  })

const port=process.env.PORT||5000  
var httpServer = http.createServer(app);
httpServer.listen(port, () => {
    debug(`HTTP server running on ${port}.`)
  })
// var httpsServer = https.createServer(credentials, app);
// httpsServer.listen(port, () => {
//     debug(`HTTPS server running on ${port}.`)
//   })
