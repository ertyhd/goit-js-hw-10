import './css/styles.css';
import './fetchCountries';

const DEBOUNCE_DELAY = 300;
const refs = {
  searchBox: document.querySelector('#search-box'),
  countryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
  countryBtn: document.querySelector('.button'),
};

// refs.searchBox.addEventListener('input', () => {
//   fetchCountries()
//     .then(names => renderCountriesList(names))
//     .catch(error => console.log(error));
// });

// function fetchCountries(names) {
//   return fetch('https://restcountries.com/#api-endpoints-v3-name').then(
//     response => {
//       if (!response.ok) {
//         throw new Error(response.status);
//       }
//       return response.json();
//     }
//   );
// }

// function renderCountriesList(names) {
//   const markup = names
//     .map(name => {
//       return `<li>
//             <p><b>Name</b>: ${name}</p>
//             <p><b>Email</b>: ${name}</p>
//             <p><b>Company</b>: ${name}</p>
//           </li>`;
//     })
//     .join('');
//   refs.countryList.innerHTML = markup;
// }
