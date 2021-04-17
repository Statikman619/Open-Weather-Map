let apiKey = "f01a2b3157f4e50226ee045efd1eeca5";

let searchBtn = document.getElementById("search-button");
searchBtn.addEventListener("click", handleSearch);

function weatherData(lat, lon, city) {
  console.log("click");

  fetch(
    "https://api.openweathermap.org/data/2.5/onecall?units=imperial&lat=" +
      lat +
      "&lon=" +
      lon +
      "&appid=" +
      apiKey
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);

      let storage = JSON.parse(localStorage.getItem("cities")) || [];
      storage.push(city);
      localStorage.setItem("cities", JSON.stringify(storage));

      let cityName = document.createElement("h3");
      cityName.classList.add("inline");
      cityName.textContent =
        city + " (" + new Date().toLocaleDateString() + ")";

      let icon = document.createElement("i");
      let mainWeather = data.current.weather[0].main;
      icon.className = pickWeather(mainWeather);

      console.log(mainWeather);
      console.log(data);

      $("#weather-icon").empty().append(cityName, icon);

      $("#temperature").text(data.current.temp);
      $("#wind-speed").text(data.current.wind_speed);
      $("#uv-index").text(data.current.uvi);
      $("#humidity").text(data.current.humidity + "%");

      $("#futureHumidity0").text(data.daily[0].humidity + "%");
      $("#futureTemp0").text(data.daily[0].temp.day);

      $("#futureHumidity1").text(data.daily[1].humidity + "%");
      $("#futureTemp1").text(data.daily[1].temp.day);

      $("#futureHumidity2").text(data.daily[2].humidity + "%");
      $("#futureTemp2").text(data.daily[2].temp.day);

      $("#futureHumidity3").text(data.daily[3].humidity + "%");
      $("#futureTemp3").text(data.daily[3].temp.day);

      $("#futureHumidity4").text(data.daily[4].humidity + "%");
      $("#futureTemp4").text(data.daily[4].temp.day);

      let test = document.createElement("li");
      test.className = "search-history";

      $("#futureDate0").text(
        new Date(data.daily[0].dt * 1000).toLocaleDateString()
      );
      $("#futureDate1").text(
        new Date(data.daily[1].dt * 1000).toLocaleDateString()
      );
      $("#futureDate2").text(
        new Date(data.daily[2].dt * 1000).toLocaleDateString()
      );
      $("#futureDate3").text(
        new Date(data.daily[3].dt * 1000).toLocaleDateString()
      );
      $("#futureDate4").text(
        new Date(data.daily[4].dt * 1000).toLocaleDateString()
      );

      $("#futureImg0").attr(
        "src",
        "https://openweathermap.org/img/w/" +
          data.daily[0].weather[0].icon +
          ".png"
      );

      $("#futureImg1").attr(
        "src",
        "https://openweathermap.org/img/w/" +
          data.daily[1].weather[0].icon +
          ".png"
      );

      $("#futureImg2").attr(
        "src",
        "https://openweathermap.org/img/w/" +
          data.daily[2].weather[0].icon +
          ".png"
      );

      $("#futureImg3").attr(
        "src",
        "https://openweathermap.org/img/w/" +
          data.daily[3].weather[0].icon +
          ".png"
      );

      $("#futureImg4").attr(
        "src",
        "https://openweathermap.org/img/w/" +
          data.daily[4].weather[0].icon +
          ".png"
      );

      test.innerHTML = city;
      $("#history").append(test);
    });
}

$("#clear-history").on("click", clearHistory);
function clearHistory() {
  $("#history").empty();
}

function pickWeather(weather) {
  if (weather === "Clouds") {
    return "fas fa-cloud";
  }
}

function handleSearch() {
  const city = $("#search-city").val();
  $.ajax({
    url: `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=f01a2b3157f4e50226ee045efd1eeca5`,
    method: "GET",
  }).then(function (response) {
    console.log(response);
    let lat = response.coord.lat;
    let lon = response.coord.lon;
    weatherData(lat, lon, city);
  });
}
