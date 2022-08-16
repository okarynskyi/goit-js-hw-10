import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const DEBOUNCE_DELAY = 300;
const input = document.querySelector('input#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');


input.addEventListener('input', debounce(showCountries, DEBOUNCE_DELAY));

function showCountries() {
    const nameCountry = input.value.toLowerCase().trim();

    if (!nameCountry) {
        clearMarkup();
        return
    }

    fetchCountries(nameCountry)
        .then(data => {
    outputRender(data)
  })
        .catch(error => Notify.failure('Oops, there is no country with that name'));
}

function outputRender(list) {
    if (list.length > 10) {
    Notify.info('Too many matches found. Please enter a more specific name.');
  } else if (list.length <= 10 && list.length > 1) {
    clearMarkup();
    renderList(list, countryList);
  } else {
    clearMarkup();
    renderInfo(list, countryInfo);
    return;
  }
}

function clearMarkup () {
  countryList.innerHTML = '';
  countryInfo.innerHTML = '';
}
function renderList(list, markupEl) {
    const markup = list
         .map(({ flags: { svg }, name: { official } }) => {
         return `<li class="country-list__item">
          <img src="${svg}" alt="flag" width="40">
          <h2 class="country-list__title">${official}</h2>
                </li>`
        })
      .join('');
    return (markupEl.innerHTML = markup);
};

function renderInfo(list, markupEl) {
    const markup = list
    .map(
      ({
        name: { official },
        capital,
        population,
        flags: { svg },
        languages,
      }) =>
        `<div class="country-list__box"><img src="${svg}" alt="flag" width="40">
        <h1 class="country-list__title">${official}</h1>
        </div>
        <ul class="country-list">
        <li class="country-list__item">
        <h2 class="country-list__title">Capital:</h2>
        <p>${capital}</p>
        </li>
        <li class="country-list__item">
        <h2 class="country-list__title">Population:</h2>
        <p>${population}</p>
        </li>
        <li class="country-list__item">
        <h2 class="country-list__title">Languages:</h2>
        <p>${Object.values(languages)}</p></li>
        </ul>`
    )
    .join('');
  return (markupEl.innerHTML = markup);
};