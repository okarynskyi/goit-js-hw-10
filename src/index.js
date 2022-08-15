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
    const nameCountry = input.value.trim();
    if (nameCountry === "") {
        countryInfo.innerHTML = "";
        countryList.innerHTML = "";
        return
    }
    fetchCountries(nameCountry)
}