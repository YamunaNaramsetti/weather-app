
import "./App.css";
import {Circles} from "react-loader-spinner"

import React, { useState, useEffect } from "react";



const API_KEY = "1be98b1227ef6beaa1048d6245ca0842";
const BASE_URL = "https://api.openweathermap.org/data/2.5/";

export default function WeatherApp() {
  const [location, setLocation] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleLocationSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setWeatherData(null);
  };

  useEffect(() => {
    if (!location || !isLoading) {
      return;
    }

    const fetchData = async () => {
      try {
        const response = await fetch(
          `${BASE_URL}weather?q=${location}&appid=${API_KEY}&units=metric`
        );
        const data = await response.json();
        if (data.cod === "404") {
          setErrorMessage(data.message);
        } else {
          setWeatherData(data);
          setErrorMessage(null);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [location, isLoading]);

  return (
    <>
      <div className="container">
      <div className="card-cont">

      <h1 className="heading">Weather App</h1>
        <form onSubmit={handleLocationSubmit}>
        <div className="inp-cont">
          <div>
          
            
            <input
              type="text"
              placeholder="e.g. London, UK"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
          <div className="btn-cont">
          <button variant="primary" type="submit">
            Search
          </button>

          </div>
          </div>
          
        </form>
        {isLoading && (
  <div className="spinner-btn text-center">
  <Circles animation="border" variant="success" />
</div>

)}
        {errorMessage && <p variant="danger">{errorMessage}</p>}
        {weatherData && (
            <div className="result">
            <div>
              <div>
                <h2>
                  
                  {weatherData.name}, {weatherData.sys.country}
                </h2>
              
              <h1 className="cli">
                {weatherData.weather[0].description}
              </h1>
              </div>
              <div className="parameters">
              <p>Temperature: {Math.round(weatherData.main.temp)} °C</p>
              <p>Feels like: {Math.round(weatherData.main.feels_like)} °C</p>
              <p>Humidity: {weatherData.main.humidity}%</p>
              <p>Pressure: {weatherData.main.pressure} hPa</p>
              <p>Wind speed: {Math.round(weatherData.wind.speed)} m/s</p>
              </div>

            </div>
          </div>
          
        )}
      </div>
      </div>

    </>
  );
}