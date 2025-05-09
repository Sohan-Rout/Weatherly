"use client";
import { useState, useEffect } from "react";
import LocationFetcher from "@/app/components/LocationFetcher";

const Display = () => {
  const [weather, setWeather] = useState(null);
  const [hourlyWeather, setHourlyWeather] = useState(null);
  const [coordinates, setCoordinates] = useState(null);
  const [error, setError] = useState("");
  const [city, setCity] = useState("");
  const [tasks, setTasks] = useState({});
  const [newTask, setNewTask] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [weekDates, setWeekDates] = useState([]);
  const [today, setToday] = useState("");

  useEffect(() => {
    const getWeekDates = () => {
      const dates = [];
      const todayDate = new Date();
      for (let i = 0; i < 7; i++) {
        const date = new Date(todayDate);
        date.setDate(todayDate.getDate() + i);
        dates.push({
          iso: date.toISOString().split("T")[0],
          weekday: date.toLocaleDateString([], { weekday: "short" }),
          shortDate: date.toLocaleDateString([], { month: "short", day: "numeric" }),
        });
      }
      return dates;
    };

    const todayIso = new Date().toISOString().split("T")[0];
    setToday(todayIso);
    setWeekDates(getWeekDates());
  }, []);

  const handleSearch = () => {
    const trimmedCity = city.trim();
    if (trimmedCity) {
      setError("");
      setWeather(null);
      setHourlyWeather(null);
      setCoordinates(null);
      setCity(trimmedCity);
    } else {
      setError("Please enter a city name.");
    }
  };

  const formatHour = (dt) => {
    const date = new Date(dt * 1000);
    return date.toLocaleTimeString([], { hour: "numeric", hour12: true });
  };

  const handleAddTask = () => {
    if (newTask.trim() && selectedDate) {
      setTasks((prev) => ({
        ...prev,
        [selectedDate]: [...(prev[selectedDate] || []), newTask.trim()],
      }));
      setNewTask("");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900">
      {/* Sticky Search Bar */}
      <div className="sticky top-0 z-10 bg-white dark:bg-gray-900 pt-4 px-4 sm:px-6 pb-2 shadow-sm">
        <div className="flex justify-center items-center space-x-3 w-full max-w-md mx-auto">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Search city..."
            className="px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-sm text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-amber-500 flex-grow"
          />
          <button
            onClick={handleSearch}
            className="px-4 py-2 bg-black dark:bg-amber-500 text-white dark:text-black rounded-md hover:bg-gray-400 dark:hover:bg-amber-600 text-sm whitespace-nowrap"
          >
            Search
          </button>
        </div>
        {error && <p className="text-red-500 text-sm text-center mt-2">{error}</p>}
      </div>

      <LocationFetcher
        setWeather={setWeather}
        setHourlyWeather={setHourlyWeather}
        setCoordinates={setCoordinates}
        setError={setError}
        city={city}
      />

      {/* Scrollable Content Area */}
      <main className="flex-1 overflow-y-auto px-4 sm:px-6 pb-6">
        <div className="max-w-4xl mx-auto w-full space-y-4 py-2">
          {/* Weather Cards - Row on desktop, column on mobile */}
          <div className="flex flex-col md:flex-row gap-4 w-full">
            {/* Current Weather Card */}
            {weather && (
              <div className="w-full md:flex-1 text-center bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow-md">
                <h2 className="text-xl font-bold mb-2">
                  {weather.name || "Current Location"}
                </h2>
                <p className="text-base capitalize mb-1">
                  {weather.weather?.[0]?.description || "N/A"}
                </p>
                <p className="text-3xl font-semibold my-3">
                  {weather.main?.temp ? `${Math.round(weather.main.temp)}°C` : "N/A"}
                </p>
                <div className="grid grid-cols-2 gap-2 text-xs sm:text-sm">
                  <p>
                    Feels Like:{" "}
                    {weather.main?.feels_like
                      ? `${Math.round(weather.main.feels_like)}°C`
                      : "N/A"}
                  </p>
                  <p>
                    Humidity:{" "}
                    {weather.main?.humidity ? `${weather.main.humidity}%` : "N/A"}
                  </p>
                  <p>
                    Wind Speed:{" "}
                    {weather.wind?.speed ? `${weather.wind.speed} m/s` : "N/A"}
                  </p>
                  <p>
                    Pressure:{" "}
                    {weather.main?.pressure ? `${weather.main.pressure} hPa` : "N/A"}
                  </p>
                </div>
              </div>
            )}
            
            {/* Hourly Forecast Card */}
            {hourlyWeather && (
              <div className="w-full md:flex-1 bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow-md">
                <h2 className="text-xl font-bold mb-3">Hourly Forecast</h2>
                <div className="space-y-2">
                  {hourlyWeather.list.slice(0, 6).map((hour, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center text-xs sm:text-sm"
                    >
                      <p>{formatHour(hour.dt)}</p>
                      <div className="flex items-center space-x-1">
                        <img
                          src={`http://openweathermap.org/img/wn/${hour.weather[0].icon}.png`}
                          alt={hour.weather[0].description || "Weather icon"}
                          className="w-6 h-6"
                        />
                        <p className="capitalize">
                          {hour.weather[0].description || "N/A"}
                        </p>
                      </div>
                      <p className="font-medium">{Math.round(hour.main.temp)}°C</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Calendar and Tasks - Always vertical stack */}
          {weekDates.length > 0 && (
            <div className="flex flex-col gap-4 w-full">
              {/* Calendar Card */}
              <div className="w-full bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow-md">
                <h2 className="text-xl font-bold mb-3">Weekly Calendar</h2>
                <div className="overflow-x-auto">
                  <div className="grid grid-cols-7 gap-1 text-xs sm:text-sm min-w-[500px]">
                    {weekDates.map((date) => (
                      <div
                        key={date.iso}
                        className={`p-1 sm:p-2 rounded-md min-h-[100px] ${
                          date.iso === today
                            ? "bg-amber-500 text-black"
                            : "bg-gray-200 dark:bg-gray-700"
                        }`}
                      >
                        <p className="font-semibold">{date.weekday}</p>
                        <p className="mb-1">{date.shortDate}</p>
                        <ul className="mt-1 space-y-0.5 list-inside">
                          {(tasks[date.iso] || []).map((task, idx) => (
                            <li key={idx} className="text-xs break-words line-clamp-2">
                              {task}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Task Input Card */}
              <div className="w-full bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow-md">
                <h2 className="text-xl font-bold mb-3">Add Task</h2>
                <div className="space-y-3">
                  <select
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-sm text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-amber-500"
                  >
                    <option value="">Select a date</option>
                    {weekDates.map((date) => (
                      <option key={date.iso} value={date.iso}>
                        {`${date.weekday}, ${date.shortDate}`}
                      </option>
                    ))}
                  </select>
                  <input
                    type="text"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    placeholder="Enter task..."
                    className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-sm text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-amber-500"
                  />
                  <button
                    onClick={handleAddTask}
                    className="w-full px-3 py-2 bg-black dark:bg-amber-500 text-white dark:text-black rounded-md hover:bg-gray-400 dark:hover:bg-amber-600 text-sm"
                  >
                    Add Task
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Display;