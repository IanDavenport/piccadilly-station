
require('dotenv').config(); 
const express = require('express');
const hbs = require('express-handlebars');
const path = require('path');

const trains = require('./lib/trains');

const app = express();


app.engine('.hbs', hbs({
    extname: '.hbs',
    defaultLayout: 'layout',
}));

app.set('view engine', '.hbs');
app.use(express.static(path.join(__dirname, 'public')));


/////////////////////////////////////////////////////////////////////////////////
app.get('/trains', async (req, res) => {
    let data = await trains();
    console.log(data);
    let departures = [ ];
    for (const train of data.departures.all) { 
        departures.push({
            operatorname: train.operator_name,
            platform: train.platform,
            status: train.status,
            arrival: train.aimed_arrival_time,
            departure_time: train.aimed_departure_time,
            destination: train.destination_name
        });
    }
    console.log(departures);
 
    let date = data.date;                   
    let time = data.time_of_day;            
    res.render('trains', {date, time, departures });
});

/////////////////////////////////////////////////////////////////////////////////


app.listen(3000, () =>{
    console.log('Server listening on port 3000');
});







