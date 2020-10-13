import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import './assets/style.scss';

import initListeners, { getGif, getWeather, updateDom } from './utils';

function component() {
  const element = document.createElement('div');
  element.className = 'container-fluid p-3 d-block mx-auto w-100';

  element.innerHTML = `
    <div class="row">
      <form action="#" id="form" class="mx-auto p-3 my-3 shadow rounded w-50">
        <div class="form-group">
          <label for="location" class="form-label">Search location (by city or country)</label>
          <input type="search" name="location" id="location" class="form-control" required minlength="3" maxlength="30" placeholder="City or Country (default: Constanta, Romania)">
        </div>

        <button type="submit" class="btn btn-info d-block mx-auto">Get the weather</button>
        <p class="mt-2 text-small text-info text-center" id="search-error">And a Gif about the weather description</p>
      </form>
    </div>
    <div class="row">
      <div class="col-md-6">
        <img src="https://media.giphy.com/media/dxywOfwJmdEd0EIdgB/giphy.gif" alt="Default Gif" id="weather-image">
        <p class="text-center" id="gif-error">Here is your Gif (as promissed)</p>
      </div>
      <div class="col-md-6">
        <table class="table table-dark">
          <thead>
            <tr>
              <th scope="col">Property</th>
              <th scope="col">Value <button class="btn btn-info btn-sm ml-1 px-2" id="toggleTemperature" class="text-info"><i class="fas fa-sync"></i> <span id="tempType">F</span></button></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">Location</th>
              <td id="zone">-</td>
            </tr>
            <tr>
              <th scope="row">Description</th>
              <td id="description">-</td>
            </tr>
            <tr>
              <th scope="row">Average temp</th>
              <td id="temp">-</td>
            </tr>
            <tr>
              <th scope="row">Max temp</th>
              <td id="tempMax">-</td>
            </tr>            
            <tr>
              <th scope="row">Min temp</th>
              <td id="tempMin">-</td>
            </tr>
            <tr>
              <th scope="row">Wind speed</th>
              <td id="wind">-</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    `;

  return element;
}

document.body.appendChild(component());
initListeners();
getWeather('constanta').then((weather) =>
  updateDom(
    weather,
    'https://media.giphy.com/media/dxywOfwJmdEd0EIdgB/giphy.gif'
  )
);
