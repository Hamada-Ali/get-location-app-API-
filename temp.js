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

// // const getBorderCountry = countryName => {

// //   const request = new XMLHttpRequest();
// //   request.open('GET', `https://restcountries.com/v3.1/name/${countryName}`);
// //   request.send();

// // request.addEventListener('load', () => {
// //   const [data] = JSON.parse(request.responseText)

// //   const lang = getLang(data)
// //   const currency = getCurr(data);

// //     renderCountry(data, lang, currency);

// //     const [border]=data.borders;

// //     const neighborRequest = new XMLHttpRequest();
// //     neighborRequest.open('GET', `https://restcountries.com/v3.1/alpha/${border}`);
// //     neighborRequest.send();

// //     neighborRequest.addEventListener('load' ,() => {
// //       const [neighborData] = JSON.parse(neighborRequest.responseText)
// //       const neighborLang = getLang(neighborData)
// //       const neighborCurrency = getCurr(neighborData)
// //       renderCountry(neighborData, neighborLang, neighborCurrency, 'neighbour')

// //     })

// //   })
// // }

// //getBorderCountry('algeria');


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
  whereAmI(52.508, 13.381)
  whereAmI(19.037, 72.873)
  whereAmI(-33.933, 18.474)
})


// get my geolocatoin 
// const getLocation = () =>  {
//   if(navigator.geolocation) {
//    navigator.geolocation.getCurrentPosition(msg => {
//     //console.log(msg)
//      const latitude = (msg.coords).latitude
//      const longitude = (msg.coords).longitude
//      const myCoords = [latitude, longitude];
//      whereAmI(myCoords)
//   }, (err) => {return err.message})
//   }
// }

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


///////////////////////////////////////
// Coding Challenge #2

/* 
Build the image loading functionality that I just showed you on the screen.

Tasks are not super-descriptive this time, so that you can figure out some stuff on your own. Pretend you're working on your own 😉

PART 1
1. Create a function 'createImage' which receives imgPath as an input.
 This function returns a promise which creates a new image (use document.createElement('img')) and sets the .src attribute to the provided image path.
  When the image is done loading, append it to the DOM element with the 'images' class, and resolve the promise. The fulfilled value should be the image element itself.
   In case there is an error loading the image ('error' event), reject the promise.

If this part is too tricky for you, just watch the first part of the solution.

PART 2
2. Comsume the promise using .then and also add an error handler;
3. After the image has loaded, pause execution for 2 seconds using the wait function we created earlier;
4. After the 2 seconds have passed, hide the current image (set display to 'none'), and load a second image 
(HINT: Use the image element returned by the createImage promise to hide the current image. You will need a global variable for that 😉);
5. After the second image has loaded, pause execution for 2 seconds again;
6. After the 2 seconds have passed, hide the current image.

TEST DATA: Images in the img folder. Test the error handler by passing a wrong image path. Set the network speed to 'Fast 3G' in the dev tools Network tab
, otherwise images load too fast.

GOOD LUCK 😀
*/


