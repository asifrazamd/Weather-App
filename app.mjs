// Import Express and node-fetch libraries
import express from 'express';
import fetch from 'node-fetch';

// Create an Express app
const app = express();

// Define a route for the root URL ('/')
app.get('/', (req, res) => {
  // Send an HTML response with a form to input city name
  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Weather App</title>
        <style>
            /* Style the body and form elements */
            body {
              text-align: center;
              margin-top: 250px;
              background-color: #ADD8E6; /* Light blue background color */
            }
            form {
              margin-bottom: 20px;
            }
          </style>
      </head>
      <body>
        <form action="/weather" method="get">
          <label for="city">City:</label>
          <input type="text" id="city" name="city">
          <button type="submit">Search</button>
        </form>
        <h1>Weather App</h1>
      </body>
    </html>
  `);
});

// Define a route for the '/weather' URL
app.get('/weather', async (req, res) => {
  // Get the city name from the query parameter
  const city = req.query.city;

  // Construct the API URL with the city name and API key
  //const url = `(link unavailable);
  const url = `https://api.weatherstack.com/current?access_key=e9c474146bdc43672063c67028fd5092&query=${city}`;


  try {
    // Fetch the weather data from the API
    const response = await fetch(url);

    // Check if the response is OK (200-299)
    if (!response.ok) {
      throw new Error('HTTP error! status: ' + response.status);
    }

    // Parse the response as JSON
    const result = await response.json();

    // Send an HTML response with the weather data
    res.send(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Weather in ${city}</title>
          <style>
            /* Style the body and form elements */
            body {
              text-align: center;
              margin-top: 250px;
              background-color: #ADD8E6; /* Light blue background color */
            }
            form {
              margin-bottom: 20px;
            }
          </style>
        </head>
        <body>
          <form action="/weather" method="get">
            <label for="city">City:</label>
            <input type="text" id="city" name="city">
            <button type="submit">Search</button>
          </form>
          <h1>Weather in ${city}</h1>
          <p>Temperature: ${result.current.temperature}°C</p>
          <p>Weather Condition: ${result.current.weather_descriptions[0]}</p>
          <p>Humidity: ${result.current.humidity}%</p>
          <p>Wind Speed: ${result.current.wind_speed} km/h</p>
          <p>Weather Visibility: ${result.current.visibility}</p>
          <p>Localtime: ${result.location.localtime}</p>
          <p>Observation Time: ${result.current.observation_time}</p>
          <p>Time Zone: ${result.location.timezone_id}</p>
          <p>Country: ${result.location.country}</p>
          <p>Region: ${result.location.region}</p>
        </body>
      </html>
    `);
  } catch (error) {
    // Log any errors and send a 500 error response
    console.error(error);
    res.status(500).send('Error fetching weather data');
  }
});

// Start the server on port 3000
app.listen(3000, () => {
  console.log('Server running on port 3000');
});