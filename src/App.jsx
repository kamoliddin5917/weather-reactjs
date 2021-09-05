import { useEffect, useState } from "react";
import "./App.css";

const api = {
  key: "3b3d66e6fd0fafb2fe923421ca903742",
  url: "https://api.openweathermap.org/data/2.5/",
};

function App() {
  const [search, setSearch] = useState("Tashkent");
  const [weather, setWeather] = useState(null);
  const [kun, setKun] = useState("");
  const [watch, setWatch] = useState("");

  const searchFetch = (e) => {
    if (e.key === "Enter" && search) {
      fetch(`${api.url}weather?q=${search}&units=metric&APPID=${api.key}`)
        .then((responst) => responst.json())
        .then((result) => {
          setWeather(result);
          setSearch("");
        })
        .catch((err) => console.log(err));
    }
  };

  useEffect(() => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "Oktober",
      "November",
      "December",
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const vaqt = () => {
      let d = new Date();
      const day = days[d.getDay()];
      const date = d.getDate();
      const month = months[d.getMonth()];
      const year = d.getFullYear();

      setKun(`${day} ${date} ${month} ${year}`);
    };
    vaqt();
  });

  let d = new Date();
  useEffect(() => {
    setTimeout(function () {
      let hour = d.getHours();
      let minute = d.getMinutes();
      let second = d.getSeconds();

      setWatch(`${hour}:${minute}:${second}`);
    }, 1000);
  }, [d]);

  return (
    <section
      className={`
        box ${
          weather &&
          +weather.cod === 200 &&
          ((weather.main.temp > 40 && "desert") ||
            (weather.main.temp < 0 && "cold"))
        }`}
    >
      <input
        className={`search__input ${
          weather && +weather.cod !== 404 && +weather.cod !== 200 && "invalid"
        }`}
        type="text"
        placeholder="Search City"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
        onKeyPress={searchFetch}
      />
      {weather && +weather.cod === 404 && (
        <div className="error">{weather.message}</div>
      )}

      {weather && +weather.cod === 200 && (
        <div className="result">
          <h1 className="result__city">
            {weather.name}, {weather.sys.country}
          </h1>
          <p className="result__today">{kun}</p>

          <div className="result__gradus">
            <p className="result__gradus-number">
              {Math.round(weather.main.temp) + "°C"}
            </p>
          </div>

          <p className="result__gradus-between">
            {Math.round(weather.main.temp_min) + "°C"} <span>- </span>
            {Math.round(weather.main.temp_max) + "°C"}
          </p>

          <p className="result__situation">{weather.weather[0].description}</p>
        </div>
      )}

      <div className="watch">{watch}</div>
    </section>
  );
}

export default App;
