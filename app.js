
const baseURL = 'https://restcountries.com/v3.1';
const searchURL = baseURL + '/name/';
const visitorCountryURL = 'https://api.ipdata.co/?api-key=9f88880da663df4f670bc11a349df9c1c58fed8db89f2260fc690780';
const countryContainer = document.querySelector('.countries');
const search = document.querySelector('#search-country');
const searchButton = document.querySelector('#search-button');
const icon = document.querySelector('.icon');
const errorResultEl = document.querySelector('.search-value');
const errorResultContainer = document.querySelector('.error-container');

//start the app
start();

//dynamic function to fetch url's
async function fetchUrl(url) {
    return fetch(url)
    .then(response => response.json())
    .catch(error => console.log("Failed to download data"));   
}

//get the country of the visitor

function getVisitorCountry() {
    fetchUrl(visitorCountryURL).then(data => {
        let visitor = data.country_name;
        fetchUrl(searchURL + visitor).then( data => {
            buildHtml(data);
        })
  })
}

//building the html structure

function buildHtml(data) {
    const countryFlag = data[0].flags.png
    const imgAlt = data[0].flags.alt
    const country = data[0].name.common
    const capitalCity = data[0].capital
    const languageObject = Object.values(data[0].languages)[0].split(",").join(" ")
    const population = data[0].population
    const independent = data[0].independent
    const continent = data[0].continents
    const currenciesName = data[0].currencies[Object.keys(data[0].currencies)].name
    const currenciesSymbol = data[0].currencies[Object.keys(data[0].currencies)].symbol
    const timezone = data[0].timezones[0]
    const countryEl = document.createElement('div');
    countryEl.classList.add('country-container','flex','justify-start', 'flex-col', 'lg:flex-row', 'gap-4'); 
    countryEl.innerHTML = 
    `<div class="basis-1/3">
    <img src="${countryFlag}" alt="${imgAlt}">
    <p class="text-3xl font-bold">${country}</p>
    </div>
    <div class="basis-1/2 flex justify-between bg-gray-50 p-4 gap-2">
        <div class="flex flex-col justify-between gap-2">
            <p class="text-xl text-blue-500"><span class="text-2xl text-black">Capitalcity:</span> ${capitalCity}</p>
            <p class="text-xl text-blue-500"><span class="text-2xl text-black">Languages:</span> ${languageObject}</p>
            <p class="text-xl text-blue-500"><span class="text-2xl text-black">Population:</span> ${population}</p>
            <p class="text-xl text-blue-500"><span class="text-2xl text-black">Borders:</span> ${population}</p>
        </div>
        <div class="flex flex-col justify-between gap-2">
            <p class="text-xl text-blue-500"><span class="text-2xl text-black">Independent:</span> ${independent}</p>
            <p class="text-xl text-blue-500"><span class="text-2xl text-black">Continent:</span> ${continent}</p>
            <p class="text-xl text-blue-500"><span class="text-2xl text-black">Currencies:</span> ${currenciesName} <span>(${currenciesSymbol})</span></p>
            <p class="text-xl text-blue-500"><span class="text-2xl text-black">Timezone:</span> ${timezone}</p>
        </div>
    </div>`;
    countryContainer.appendChild(countryEl);
}

//define search function

function searchCountry() {
    const newHTML = document.querySelector('.countries')
    newHTML.innerHTML = " ";
    const query = search.value
    fetchUrl(searchURL + query + '?')
        .then( data => {
            buildHtml(data)
    })
    const text1 = document.querySelector('.text1');
    text1.classList.add('hidden')
}

//start function
function start() {
    getVisitorCountry()
    searchButton.addEventListener('click', searchCountry);
}



