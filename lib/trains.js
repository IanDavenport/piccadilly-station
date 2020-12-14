

const fetch = require('node-fetch');

const trains = async() => {
    const url = `https://transportapi.com/v3/uk/train/station/MAN/live.json?app_id=${process.env.MYAPPID}&app_key=${process.env.MYTRAINSKEY}&darwin=false&train_status=passenger`;
    let data =  await fetch(url);
    let jsonData = await data.json();
    console.log(jsonData);
    return jsonData
}

module.exports = trains;

