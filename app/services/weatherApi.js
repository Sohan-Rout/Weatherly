const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;

if (!API_KEY) {
  console.error("NEXT_PUBLIC_OPENWEATHER_API_KEY is not defined in environment variables");
}

export async function fetchWeatherByCity(city) {
  try {
    console.log(`Fetching weather for city: ${city}`);
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch weather: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();
    console.log("Weather data fetched:", data);
    return data;
  } catch (error) {
    console.error(`Error fetching weather for city ${city}:`, error);
    return null;
  }
}

export async function fetchWeather(lat, lon) {
  try {
    console.log(`Fetching weather for lat: ${lat}, lon: ${lon}`);
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch weather: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();
    console.log("Weather data fetched:", data);
    return data;
  } catch (error) {
    console.error(`Error fetching weather for lat: ${lat}, lon: ${lon}:`, error);
    return null;
  }
}

export async function fetchHourlyWeather(lat, lon) {
  try {
    console.log(`Fetching hourly weather for lat: ${lat}, lon: ${lon}`);
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch hourly weather: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();
    console.log("Hourly weather data fetched:", data);
    return data;
  } catch (error) {
    console.error(`Error fetching hourly weather for lat: ${lat}, lon: ${lon}:`, error);
    return null;
  }
}

export async function fetchHourlyWeatherByCity(city) {
  try {
    console.log(`Fetching hourly weather for city: ${city}`);
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch hourly weather: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();
    console.log("Hourly weather data fetched:", data);
    return data;
  } catch (error) {
    console.error(`Error fetching hourly weather for city ${city}:`, error);
    return null;
  }
}