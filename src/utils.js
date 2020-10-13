import axios from 'axios';

const getWeather = async (location) => {
  try {
    const result = await axios.get(
      `${process.env.WEATHER_BASE_URI}${location}`
    );
    console.log(result.data);
    const {
      name,
      main: { temp, temp_max: tempMax, temp_min: tempMin },
      weather: [{ main, description }],
    } = result.data;
    console.log(name, temp, tempMax, tempMin, main, description);
  } catch (error) {
    console.log(error);
  }
};

const getGif = async (search) => {
  try {
    const result = await axios.get(`${process.env.GLIPHY_BASE_URI}${search}`);
    console.log(result);
  } catch (error) {
    console.log(error);
  }
};

export { getWeather, getGif };
