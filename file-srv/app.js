const express = require('express')
const serveIndex = require('serve-index')
var cors = require('cors')

const app = express()

app.get('/cors', (req, res) => {
  res.send('This has CORS enabled 🎈')
})
app.use(cors())

app.use(
  '/ftp',
  express.static('public/ftp'),
  // serveIndex('public/ftp', { icons: true })
)

app.listen(3002, () => console.log('🚀 is on port 3002...'))
