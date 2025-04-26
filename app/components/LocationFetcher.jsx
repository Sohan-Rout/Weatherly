"use client";

import { useEffect } from "react";
import { fetchWeather, fetchWeatherByCity, fetchHourlyWeather, fetchHourlyWeatherByCity } from "../services/weatherApi";

const LocationFetcher = ({ setWeather, setHourlyWeather, setCoordinates, setError, city }) => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        setError(""); // Clear previous errors
        if (city.trim()) {
          // Fetch by city
          console.log(`LocationFetcher: Searching for city: ${city}`);
          const weatherData = await fetchWeatherByCity(city);
          const hourlyData = await fetchHourlyWeatherByCity(city);
          
          if (weatherData && weatherData.cod === 200) {
            console.log("Setting weather data:", weatherData);
            setWeather(weatherData);
            setCoordinates({ lat: weatherData.coord.lat, lon: weatherData.coord.lon });
          } else {
            const errorMsg = weatherData?.message || "Could not fetch weather data for this city.";
            console.error(`City weather fetch failed: ${errorMsg}`);
            setError(`City not found or invalid: ${errorMsg}`);
            return;
          }
          
          if (hourlyData && hourlyData.cod === "200") {
            console.log("Setting hourly weather data:", hourlyData);
            setHourlyWeather(hourlyData);
          } else {
            const errorMsg = hourlyData?.message || "Could not fetch hourly weather data.";
            console.error(`City hourly weather fetch failed: ${errorMsg}`);
            setError(`Hourly data unavailable: ${errorMsg}`);
          }
        } else if (navigator.geolocation) {
          // Fetch by geolocation
          console.log("LocationFetcher: Requesting geolocation");
          navigator.geolocation.getCurrentPosition(
            async (position) => {
              try {
                const { latitude, longitude } = position.coords;
                console.log(`Geolocation coords: lat=${latitude}, lon=${longitude}`);
                const weatherData = await fetchWeather(latitude, longitude);
                const hourlyData = await fetchHourlyWeather(latitude, longitude);
                
                if (weatherData && weatherData.cod === 200) {
                  console.log("Setting weather data:", weatherData);
                  setWeather(weatherData);
                  setCoordinates({ lat: latitude, lon: longitude });
                } else {
                  console.error("Geolocation weather fetch failed");
                  setError("Could not fetch weather data for your location.");
                }
                
                if (hourlyData && hourlyData.cod === "200") {
                  console.log("Setting hourly weather data:", hourlyData);
                  setHourlyWeather(hourlyData);
                } else {
                  console.error("Geolocation hourly weather fetch failed");
                  setError("Could not fetch hourly weather data.");
                }
              } catch (err) {
                console.error("Error fetching geolocation-based data:", err);
                setError("Failed to fetch weather data for your location.");
              }
            },
            (error) => {
              console.error("Geolocation error:", error);
              setError("Failed to get location. Please enable geolocation or search by city.");
            }
          );
        } else {
          console.error("Geolocation not supported");
          setError("Geolocation not supported by your browser.");
        }
      } catch (err) {
        console.error("Unexpected error fetching data:", err);
        setError("An unexpected error occurred while fetching weather data.");
      }
    };

    fetchData();
  }, [city, setWeather, setHourlyWeather, setCoordinates, setError]);

  return null;
};

export default LocationFetcher;