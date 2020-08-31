const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const config = require('config')
const PORT = config.get('port') || 3004;

const app = express();
app.use(express.json({extended:true}))
app.use(bodyParser.urlencoded({extended:true }))

app.use('/api/auth',require('./routes/auth.routes'))
app.use('/api/link',require('./routes/link.routes'))
app.use('/t',require('./routes/redirects.routes'))

async function start() {
    try {
        await mongoose.connect(
            config.get('mongoUri'),
            {
            useNewUrlParser: true,
            useFindAndModify: false,
            useUnifiedTopology: true,
            useCreateIndex:true
        })
        app.listen(PORT, () => {
            console.log('Server started')
        })
    }catch (e) {
        console.log(e)
        process.exit(1)
    }
}
start()