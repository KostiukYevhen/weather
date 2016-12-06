$(document).ready(function() {
  if (window.location.protocol != 'http:') {
    $('.condition').hide();
    $('.wind').hide();
    $('.convert').hide();
    $('.error').html('This page is not supported over https yet.<br />' +
      'Please try again over http');
  } else {
    getLocation();
  }

  function getLocation() {
    $.get('http://ip-api.com/json', function(loc) {
      $(".city").html(loc.city + ", " + loc.regionName + ", " + loc.country);
      getWeather(loc.lat, loc.lon, loc.countryCode);
    });
  };

  function getWeather(lat, lon, countryCode) {
    let weatherAPI = 'http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&units=imperial' + '&type=accurate' +
    '&APPID=f69641d5b09ad07fece03bcc9fe10400';

    $.get(weatherAPI, function(weatherData) {
      temp = weatherData.main.temp.toFixed(0);
      tempC = ((temp - 32) * (5 / 9)).toFixed(0);

      let city = weatherData.name,
        condition = weatherData.weather[0].description,
        id = weatherData.weather[0].id,
        speed = +((weatherData.wind.speed * 0.86897624190816).toFixed(1)),
        deg = weatherData.wind.deg,
        countryShort = weatherData.sys.country,
        windDir,
        icon = weatherData.weather[0].icon;
        console.log(icon);

      switch(icon) {
        case '01d':
          $('.climacon_sun').removeClass('hidden');
          break;
        case '01n':
          $('.climacon_moon').removeClass('hidden');
          break;
        case '02d':
          $('.climacon_cloudSun').removeClass('hidden');
          break;
        case '02n':
          $('.climacon_cloudMoon').removeClass('hidden');
          break;
        case '03d':
        case '03n':
        case '04d':
        case '04n':
          $('.climacon_cloud').removeClass('hidden');
          break;
        case '09d':
        case '09n':
          $('.climacon_cloudRain').removeClass('hidden');
          break;
        case '10d':
          $('.climacon_cloudDrizzleSun').removeClass('hidden');
          break;
        case '10n':
          $('.climacon_cloudDrizzleMoon').removeClass('hidden');
          break;
        case '11d':
        case '11n':
          $('.climacon_cloudLightning').removeClass('hidden');
          break;
        case '13d':
        case '13n':
          $('.climacon_cloudSnowAlt').removeClass('hidden');
          break;
        case '50d':
        case '50n':
          $('.climacon_cloudFogt').removeClass('hidden');
          break;
        default:
          $('.climacon_sun').removeClass('hidden');
            break;
      }

      if (deg) {
        let val = Math.floor((deg / 22.5) + 0.5),
          arr = [
            'N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE',
            'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW',
          ];
          windDir = arr[(val % 16)];
      } else {
        windDir = 'N';
      }

      let fahrenheit = ['US', 'BS', 'BZ', 'KY', 'PL'];
      if (fahrenheit.indexOf(countryCode) > -1) {
        $('.temp').text(temp + '° F');
      } else {
        $('.temp').text(tempC + '° C');
      }

      $(".wind").html(windDir + " " + speed + " knots");
      $(".condition").html(condition);

      $('.convert').click(function () {
        if ($('.temp').text().indexOf('F') > -1) {
          $('.temp').text(tempC + '° C');
        } else {
          $('.temp').text(temp + '° F');
        };
      });
    });
  };
});


