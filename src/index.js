const express = require('express');
const morgan = require('morgan');
const app = express();
const path = require('path'); // para acceder al HTML
const { mongoose } = require('./database');

// configuracion
app.set('port',process.env.PORT || 3000);

//middlewares
app.use(morgan('dev'));
app.use(express.json()); // se comprueba que sea json


//routes

app.use('/api/tasks',require('./routes/task.routes'));

//archivos estaticos
//app.use(express.static());
//console.log(__dirname + '\public');// donde esta el archivo js
//console.log(path.join(__dirname, 'public'));

app.use(express.static(path.join(__dirname,'public')));
//Iniciando el servidor
app.listen(app.get('port'),() =>{
    console.log(`Server on port ${app.get('port')}`);
});