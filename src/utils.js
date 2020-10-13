import axios from 'axios';

const processWeatherResult = ({
  name: city,
  main: { temp, temp_max: tempMax, temp_min: tempMin },
  weather: [{ main: description }],
  sys: { country },
  wind: { speed: windSpeed },
}) => ({
  city,
  country,
  temp,
  tempMax,
  tempMin,
  description,
  windSpeed,
});

const processGifResult = (result) => result.data.data.images.original.url;

const getGif = async (search) => {
  try {
    const result = await axios.get(
      `https://api.giphy.com/v1/gifs/translate?api_key=xd2uDy89ReVVZSV6zc1IfvgMEVc7emRk&s=${search}`
    );
    return processGifResult(result);
  } catch (error) {
    const errorEl = document.querySelector('#gif-error');
    errorEl.classList.add('text-danger');
    errorEl.innerText = `No Gif found for '${search}'`;
  }
};

const getWeather = async (location) => {
  try {
    const result = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?appid=e980682af62e957c12c38875c38ba233&units=metric&q=${location}`
    );

    const errorEl = document.querySelector('#search-error');
    errorEl.classList.remove('text-danger');
    errorEl.classList.add('text-info');
    errorEl.innerText = `You are searching for '${location}'`;
    return processWeatherResult(result.data);
  } catch (error) {
    const errorEl = document.querySelector('#search-error');
    errorEl.classList.remove('text-info');
    errorEl.classList.add('text-danger');
    errorEl.innerText =
      'The city or country you have searched does not exist on the weather API.';
  }
};

const updateDom = (weather, gif) => {
  if (weather !== undefined) {
    const {
      city,
      country,
      description,
      temp,
      tempMax,
      tempMin,
      windSpeed,
    } = weather;

    document.querySelector('#zone').innerText = `${city}, ${country}`;
    document.querySelector('#description').innerText = description;
    document.querySelector('#temp').innerText = temp;
    document.querySelector('#tempMax').innerText = tempMax;
    document.querySelector('#tempMin').innerText = tempMin;
    document.querySelector('#wind').innerText = windSpeed;
  }

  if (gif !== undefined) {
    document.querySelector('#weather-image').src = gif;
  }

  document.querySelector('#tempType').innerText = 'F';
};

const setFar = () => {
  document.querySelector('#temp').innerText = (
    (+document.querySelector('#temp').innerText * 9) / 5 +
    32
  ).toFixed(3);
  document.querySelector('#tempMin').innerText = (
    (+document.querySelector('#tempMin').innerText * 9) / 5 +
    32
  ).toFixed(3);
  document.querySelector('#tempMax').innerText = (
    (+document.querySelector('#tempMax').innerText * 9) / 5 +
    32
  ).toFixed(3);
  document.querySelector('#tempType').innerText = 'C';
};

const setCel = () => {
  document.querySelector('#temp').innerText = (
    ((+document.querySelector('#temp').innerText - 32) * 5) /
    9
  ).toFixed(3);
  document.querySelector('#tempMin').innerText = (
    ((+document.querySelector('#tempMin').innerText - 32) * 5) /
    9
  ).toFixed(3);
  document.querySelector('#tempMax').innerText = (
    ((+document.querySelector('#tempMax').innerText - 32) * 5) /
    9
  ).toFixed(3);
  document.querySelector('#tempType').innerText = 'F';
};

const tempToggler = () => {
  document
    .querySelector('#toggleTemperature')
    .addEventListener('click', (e) => {
      e.preventDefault();
      const newType = document.querySelector('#tempType').textContent;
      newType === 'F' ? setFar() : setCel();
    });
};

const formListener = () => {
  document.querySelector('#form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const weather = await getWeather(e.target.elements.location.value);

    getGif(encodeURI(weather.description)).then((gif) =>
      updateDom(weather, gif)
    );
  });
};

const initListeners = () => {
  tempToggler();
  formListener();
};

export default initListeners;
export { getWeather, getGif, updateDom };
