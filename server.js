const express = require('express');
const request = require('request');
const path = require('path');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const hbs = require('hbs');

const viewsPath = path.join(__dirname, './templates/views');

dotenv.config({ path: './config/.env' });

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'hbs');
app.set('views', viewsPath);

app.use(express.json());

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/weather', async (req, res) => {
  const apiKey = process.env.API_KEY;
  const search = req.query.search || 'Belgrade';

  if (!search) {
    return res.send({
      error: 'You must provide an address',
    });
  }

  const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${search}`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      return res.send({
        error: 'Unable to connect to weather service',
      });
    }

    if (body.cod === '404') {
      return res.send({
        error: 'Unable to find location',
      });
    }

    const weather = {
      temp: body.current.temp_c,
      condition: body.current.condition.text,
      date: body.location.localtime,
      city: body.location.name,
      country: body.location.country,
      icon: body.current.condition.icon,
      cloud: body.current.cloud,
      humidity: body.current.humidity,
      wind: body.current.wind_kph,
      windDir: body.current.wind_dir,
      feelslike: body.current.feelslike_c,
      pressure: body.current.pressure_mb,
      visibility: body.current.vis_km,
      precipitation: body.current.precip_mm,
      code: body.current.condition.code,
      timeOfDay: body.current.is_day,
    };

    res.send(weather);
  });
});

app.use(express.static(path.join(__dirname, 'public')));

app.listen(4000, () => {
  console.log('Server started on port 4000');
});
