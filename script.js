// 'use strict';

 const btn = document.querySelector('.btn-country');
 const countriesContainer = document.querySelector('.countries');

// ///////////////////////////////////////

const renderCountry = (data, lang, currency, className ='') => {
  //console.log(data[0].flags)
    const HTML = `
  <article class="country ${className}">
    <img class="country__img" src="${data.flags.png}" />
    <div class="country__data">
      <h3 class="country__name">${data.name.common}</h3>
      <h4 class="country__region">${data.subregion}</h4>
      <p class="country__row"><span>👫</span>${Number((data.population) / 1000000).toFixed(1)}M</p>
      <p class="country__row"><span>🗣️</span>${lang}</p>
      <p class="country__row"><span>💰</span>${currency}</p>
    </div>
  </article>
`
  countriesContainer.insertAdjacentHTML('afterend', HTML)
    // countriesContainer.style.opacity = 1;

}

const renderError = (msg) => {
  countriesContainer.insertAdjacentText('beforeend', msg)
  // countriesContainer.style.opacity = 1
}

const getLang = (data) => {
   let language = data.languages;
  let lang;

    // extract lang
  for(let key in language) {
     lang = language[key]
  }

  return lang;
}

const getCurr = (data) => {
     let curr = data.currencies;
  let currency;

    // extract currency
  for(let key in curr) {
     currency = curr[key].name
  }

  return currency;
}

const request = (coutnry) => {
  //console.log(coutnry)
  fetch(`https://restcountries.com/v3.1/name/${coutnry}`).then(respond => respond.json()
    .then( ([data]) => {
      renderCountry(data, getLang(data), getCurr(data))
      let border = data.borders[0];
      if(!border) return;
            //console.log(data.borders)
      return fetch(`https://restcountries.com/v3.1/alpha/${border}`)
    }).then(function (respondN) {
      respondN.json().then(([dataN]) => {
      renderCountry(dataN, getLang(dataN), getCurr(dataN), 'neighbour')
      })
    })
  ).catch((err) => {
    //console.error(`${err} 🚫`)
    renderError(`Error connection ${err.message}`)
    
  }).finally(() => countriesContainer.style.opacity = 1)
}

btn.addEventListener('click', () => {
  getLocation();
})


// get my geolocatoin 
const getLocation = () =>  {
  if(navigator.geolocation) {
   navigator.geolocation.getCurrentPosition(msg => {
    //console.log(msg)
     const latitude = (msg.coords).latitude
     const longitude = (msg.coords).longitude
     const myCoords = [latitude, longitude];
     whereAmI(myCoords)
  }, (err) => {return err.message})
  }
}

const whereAmI = (lat, long) => {
  //console.log(location)
  fetch(`https://geocode.xyz/${lat},${long}}
  ?geoit=json&auth=38410117681319180201x9299`)
  .then(respond => {
      if(!respond.ok) throw new Error(`${respond.status}: Can't handle many requests`);
   return respond.json()})
  .then((info) => {
    console.log(`you are in ${info.city}, ${info.country}`)
  return request(info.country)})
  .catch((err) => console.error(`${err}, try again`))
}

