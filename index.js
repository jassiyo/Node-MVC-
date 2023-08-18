const express = require('express');
const app = express(); 
const port = 8000;
const expressLayouts = require('express-ejs-layouts')
const db = require('./config/mongoose')

app.use(express.static('./assets'))

app.use(expressLayouts)
// extract style and script in to layout section
app.set('layout extractStyles', true)
app.set('layout extractScripts', true)


//use express router
app.use('/', require('./routes/index'))

//setup for view engines
app.set('view engine', 'ejs')
app.set('views', './views')


app.listen(port, function(err){
    if (err){
        console.log(`Server is running on: ${err}`)
    }
    console.log(`Server is running on port: ${port}`)
});