import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import './assets/style.scss';

import { getWeather, getGif } from './utils';

function component() {
  const element = document.createElement('div');

  element.innerHTML = 'Hello world1!';
  element.classList.add('h3', 'text-danger');

  return element;
}

document.body.appendChild(component());

getWeather('constanta');
getGif('clouds');
