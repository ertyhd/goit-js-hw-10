import './css/styles.css';
import './fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import { fetchCountries } from './fetchCountries';

const refs = {
  searchBox: document.querySelector('#search-box'),
  countryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
  tempForm: document.querySelector('.temp-form'),
};

const DEBOUNCE_DELAY = 300;
let dataArr = [];

const renderList = () => {
  for (const i of dataArr) {
    refs.countryList.insertAdjacentHTML(
      'beforeend',
      `<li style="display: flex; align-items: center; height: 34px"><img src="${i.flags.svg}" width="40" height="25"><p style="padding-left: 10px; font-size: 20px; ">${i.name.official}</p></li>`
    );
  }
};

const renderInfo = () => {
  const languagesList = Object.values(dataArr[0].languages);
  refs.countryInfo.insertAdjacentHTML(
    'beforeend',
    `<div style="display: flex; align-items: center; "><img src="${
      dataArr[0].flags.svg
    }" width="40" height="25"><h2 style="margin: 0; padding-left: 10px; font-size: 30px; ">${
      dataArr[0].name.official
    }</h2></div>
    <p>Capital: ${dataArr[0].capital[0]}</p><p>Population: ${
      dataArr[0].population
    }</p><p>Languages: ${languagesList.join(', ')}</p>`
  );
};

const handleSearch = event => {
  event.preventDefault();

  const inputValue = event.target.value;
  if (inputValue.length != 0) {
    fetchCountries(inputValue)
      .then(data => {
        dataArr = data;
        console.log('data', data);
        if (data.length > 10) {
          Notiflix.Notify.info(
            'Too many matches found. Please enter a more specific name.'
          );
        } else if (data.length > 1 && data.length < 10) {
          renderList();
        } else if ((data.length = 1)) {
          renderInfo();
        }
      })
      .catch(() => {
        Notiflix.Notify.failure('Oops, there is no country with that name');
      });
  }
  refs.countryInfo.innerHTML = '';
  refs.countryList.innerHTML = '';
};

refs.searchBox.addEventListener(
  'input',
  debounce(handleSearch, DEBOUNCE_DELAY)
);
refs.countryList.style.listStyle = 'none';
refs.countryList.style.padding = '0';
