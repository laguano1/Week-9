const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html")
});

app.post("/", function(req, res) {
    var latitude = req.body.latitudeInput;
    var longitude = req.body.longitudeInput;
    console.log(req.body.latitudeInput, req.body.longitudeInput);

    const units = "imperial";
    const apiKey = process.env['week9']; //original apikey from openweathermap 
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${34.0536909}&lon=${-118.242766}&units=${units}&APPID=${apiKey}`; //api used to pull one weather location
  //lat + lon is for Los Angeles, California

    https.get(url, function(response){
        console.log(response.statusCode);

        response.on("data", function(data){
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description;//pull description
            const icon = weatherData.weather[0].icon; //
            const humidity = weatherData.main.humidity; //pull humidity data
            const windSpeed = weatherData.wind.speed;//pull wind speed
            const cloudiness = weatherData.clouds.all;//pull cloudiness
            const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

            res.write(`<h1>The weather is currently ${weatherDescription}.</h1>`);
            res.write(`<h2>The temperature is ${temp} degrees Fahrenheit.</h2>`);
            res.write(`<p>Humidity: ${humidity}%</p>`);
            res.write(`<p>Wind Speed: ${windSpeed} miles/hour</p>`);
            res.write(`<p>Cloudiness: ${cloudiness}%</p>`);
            res.write(`<img src=${imageURL}>`);
            res.send();
        });
    });
});



//Code will run on 3000 or any available open port
app.listen(process.env.PORT || 3000, function() {
console.log ("Server is running on port")
});
