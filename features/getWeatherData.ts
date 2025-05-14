export const getWeatherData = async (country: string, limit: number) => {
  const cacheKey = `weather_${country}_${limit}`;
  const cachedData = localStorage.getItem(cacheKey);

  if (cachedData) {
    const { data, timestamp } = JSON.parse(cachedData);
    const cacheAge = Date.now() - timestamp;
    // 120 minutes
    if (cacheAge < 10 * 120 * 1000) {
      return data;
    }
  }
  try {
    const response = await fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${country}&limit=${limit}&appid=${process.env.NEXT_PUBLIC_API_KEY}`
    );

    const data = await response.json();

    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${data[0]["lat"]}&lon=${data[0]["lon"]}&appid=${process.env.NEXT_PUBLIC_API_KEY}`
    );

    const weatherData = await res.json();
    localStorage.setItem(
      cacheKey,
      JSON.stringify({
        data: weatherData,
        timestamp: Date.now(),
      })
    );

    return weatherData;
  } catch (error) {
    console.error("Error fetching recipes:", error);
    throw error;
  }
};
