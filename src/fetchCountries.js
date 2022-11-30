const debounce = require('lodash.debounce');

const refs = {
  searchBox: document.querySelector('#search-box'),
  countryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
  tempForm: document.querySelector('.temp-form'),
};
// const URL =
//   'https://restcountries.com/v3.1/name?fields=name,capital,languages,population,flags';

let dataArr = [];
// refs.countryList.insertAdjacentHTML(
//   'beforebegin',
//   '<p class="loading" style="display: none;">Loading...</p>'
// );

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
  refs.countryInfo.innerHTML = '';
  refs.countryList.innerHTML = '';
  const inputValue = event.target.elements.searchBox.value;

  fetch(
    `https://restcountries.com/v3.1/name/${inputValue}?fields=name,capital,population,flags,languages`
  )
    .then(resp => {
      if (!resp.ok) {
        throw new Error(response.status);
      }
      return resp.json();
    })
    .then(data => {
      dataArr = data;
      console.log(data);
      if (data.length > 10) {
        console.log('error');
      } else if (data.length > 1 && data.length < 10) {
        renderList();
      } else if ((data.length = 1)) {
        renderInfo();
      }
    })
    .catch(error => console.error(error));
};

refs.tempForm.addEventListener('submit', handleSearch);

refs.countryList.style.listStyle = 'none';
refs.countryList.style.padding = '0';

// name.official - полное имя страны
// capital - столица
// population - население
// flags.svg - ссылка на изображение флага
// languages - массив языков
