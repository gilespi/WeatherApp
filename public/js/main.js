const app = document.getElementById('weather-app');
const temp = document.querySelector('.temp');
const dateOutput = document.querySelector('.date');
const timeOutput = document.querySelector('.time');
const conditionOutput = document.querySelector('.condition');
const nameOutput = document.querySelector('.name');
const countryOutput = document.querySelector('.country');
const icon = document.querySelector('.icon');
const cloudOutput = document.querySelector('.cloud');
const humidityOutput = document.querySelector('.humidity');
const windOutput = document.querySelector('.wind');
const windDirOutput = document.querySelector('.wind-Dir');
const feelsLikeOutput = document.querySelector('.feelslike');
const pressureOutput = document.querySelector('.pressure');
const visibilityOutput = document.querySelector('.visibility');
const precipOutput = document.querySelector('.precip');
const form = document.querySelector('#search-form');
const btn = document.querySelector('.submit');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  search = document.querySelector('#search').value;

  form.reset();

  fetch(`/weather?search=${search}`)
    .then((response) => response.json())
    .then((data) => {
      temp.innerHTML = data.temp + '&#176;';
      conditionOutput.innerHTML = data.condition;

      const date = data.date;
      const y = parseInt(date.substr(0, 4));
      const d = parseInt(date.substr(8, 2));
      const m = parseInt(date.substr(5, 2));
      const time = date.substr(11);

      dateOutput.innerHTML = `${dayOfTheWeek(d, m, y)} ${d}/ ${m}/ ${y}`;
      timeOutput.innerHTML = time;

      nameOutput.innerHTML = data.city;
      countryOutput.innerHTML = data.country;

      const iconId = data.icon.substr(
        '//cdn.weatherapi.com/weather/64x64/'.length
      );

      icon.src = './icons/' + iconId;

      cloudOutput.innerHTML = data.cloud + ' %';
      humidityOutput.innerHTML = data.humidity + ' %';
      windOutput.innerHTML = data.wind + ' km/h';
      feelsLikeOutput.innerHTML = data.feelslike + ' °C';
      windDirOutput.innerHTML = data.windDir;
      pressureOutput.innerHTML = data.pressure + ' mb';
      visibilityOutput.innerHTML = data.visibility + ' km';
      precipOutput.innerHTML = data.precipitation + ' mm';

      let timeOfDay = data.timeOfDay;
      const code = data.code;

      if (timeOfDay == 0) {
        timeOfDay = 'night';
      } else if (timeOfDay == 1) {
        timeOfDay = 'day';
      }

      let conditionCode = data.code;

      switch (conditionCode) {
        case 1000:
          app.style.backgroundImage = `url (/img/${timeOfDay}/sunny.jpg)`;

          break;

        case 1003:
        case 1006:
        case 1009:
        case 1030:
        case 1069:
        case 1087:
        case 1135:
        case 1273:
          app.style.backgroundImage = `url(/img/${timeOfDay}/cloud.jpg)`;

          break;

        case 1063:
        case 1069:
        case 1072:
        case 1150:
        case 1153:
        case 1180:
        case 1183:
        case 1186:
        case 1189:
        case 1192:
        case 1195:
        case 1204:
        case 1207:
        case 1240:
        case 1243:
        case 1246:
        case 1249:
        case 1252:
        case 1276:
          app.style.backgroundImage = `url (/img/${timeOfDay}/rain.jpg)`;

          break;

        case 1066:
        case 1069:
        case 1072:
        case 1114:
        case 1117:
        case 1147:
        case 1168:
        case 1171:
        case 1210:
        case 1213:
        case 1216:
        case 1219:
        case 1222:
        case 1225:
        case 1237:
        case 1258:
        case 1261:
        case 1264:
        case 1279:
        case 1282:
          app.style.backgroundImage = `url (/img/${timeOfDay}/snow.jpg)`;

          break;

        default:
          app.style.backgroundImage = `url (/img/${timeOfDay}/clear.jpg)`;

          break;
      }
    });
});

function dayOfTheWeek(day, month, year) {
  const weekday = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  return weekday[new Date(`${day}/${month}/${year}`).getDay()];
}

function displayWeatherData() {
  fetch(`/weather`)
    .then((response) => response.json())
    .then((data) => {
      temp.innerHTML = data.temp + '&#176;';
      conditionOutput.innerHTML = data.condition;

      const date = data.date;
      const y = parseInt(date.substr(0, 4));
      const d = parseInt(date.substr(8, 2));
      const m = parseInt(date.substr(5, 2));
      const time = date.substr(11);

      dateOutput.innerHTML = `${dayOfTheWeek(d, m, y)} ${d}/ ${m}/ ${y}`;
      timeOutput.innerHTML = time;

      nameOutput.innerHTML = data.city;
      countryOutput.innerHTML = data.country;

      const iconId = data.icon.substr(
        '//cdn.weatherapi.com/weather/64x64/'.length
      );

      icon.src = './icons/' + iconId;

      cloudOutput.innerHTML = data.cloud + '%';
      humidityOutput.innerHTML = data.humidity + '%';
      windOutput.innerHTML = data.wind + 'km/h';
      feelsLikeOutput.innerHTML = data.feelslike + '°C';
    })
    .catch(() => {
      alert('City not found, please try again');
      app.style.opacity = '1';
    });
}

displayWeatherData();
app.style.opacity = '1';
