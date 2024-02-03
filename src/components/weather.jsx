import React, { useState } from "react";
import axios from "axios";

const WeatherApp = () => {
  const [city, setCity] = useState("");
  const [weatherInfo, setWeatherInfo] = useState(null);
  const [error, setError] = useState(null);

  const apiKey = "0ed08e82fa734344baf70801240302";
  const baseUrl = "http://api.weatherapi.com/v1";
  const endpoint = "/current.json";

  const getWeather = async () => {
    try {
      const response = await axios.get(`${baseUrl}${endpoint}`, {
        params: {
          key: apiKey,
          q: city,
        },
      });

      setWeatherInfo(response.data);
      setError(null);
    } catch (error) {
      setWeatherInfo(null);
      setError("Could not fetch weather data. Please try again.");
    }
  };

  return (
      <div className="h-screen pt-5 flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold underline">Weather App</h1>
<div className="flex flex-row gap-3">
<div className="flex flex-col">
      <label htmlFor="cityInput" className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">Enter City:</span>
          <span className="label-text-alt">e.g., Paris</span>
        </div>
        </label>
        <input
      className="input input-bordered w-full max-w-xs"
        type="text"
        id="cityInput"
        placeholder="Type here"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      </div>
      <div className=" flex items-end">
      <button onClick={getWeather} className="btn ">Search</button>
      </div>
</div>

      {weatherInfo && (
        <div className="pt-6" id="weather-info">
          <p>
            Current Temperature: {weatherInfo.current.temp_c}°C, Condition:{" "}
            {weatherInfo.current.condition.text}
          </p>
        </div>
      )}

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default WeatherApp;
