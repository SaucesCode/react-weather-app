import "./App.css";
import { useState } from "react";
import axios from "axios";

function App() {
  const [data, setdata] = useState({});
  const [location, setlocation] = useState("");
  const [error, seterror] = useState("");

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=24692626d6f111f54ad662f673e771bd`;

  const searchLocation = (event) => {
    if (event.key === "Enter") {
      axios
        .get(url)
        .then((response) => {
          setdata(response.data);
          seterror("");
          console.log(response.data);
        })
        .catch((err) => {
          seterror("Location not found. Please try again.");
          setdata({});
        });

      setlocation("");
    }
  };

  return (
    <div className="App">
      <div className="search">
        <input
          type="text"
          value={location}
          onChange={(event) => setlocation(event.target.value)}
          onKeyPress={searchLocation}
          placeholder="Enter Location"
        />
      </div>
      <div className="container">
        <div className="top">
          <div className="temp">
            {data.main ? <h1>{data.main.temp.toFixed()} °C</h1> : null}
          </div>
          <div className="description">
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
          <div className="location">
            <p>{data.name}</p>
          </div>
        </div>

        {data.name != undefined && (
          <div className="bottom">
            <div className="feels">
              {data.main ? (
                <p className="bold">{data.main.feels_like.toFixed()} °C</p>
              ) : null}
              <p className="notbold">Feels like</p>
            </div>
            <div className="humidity">
              {data.main ? (
                <p className="bold">{data.main.humidity} %</p>
              ) : null}
              <p className="notbold">Humidity</p>
            </div>
            <div className="wind">
              {data.wind ? <p className="bold">{data.wind.speed} MPH</p> : null}
              <p className="notbold">Wind Speed</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
