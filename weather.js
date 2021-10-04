'use strict';


window.addEventListener('load', ()=> {
    let lon;
    let lat;
    let myKey = "7817c0059c6f1d198eefd4196692750d";
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');
    


    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position =>{
            lon = position.coords.longitude;
            lat = position.coords.latitude;
            
            console.log(lon,lat);
            
            const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${myKey}
            `;
            fetch(api)
            .then(response => {
                return response.json();
            })
            .then(data => {
                console.log(data);
                const {temp} = data.main;
                const wthr = data.weather[0].description;
                const iconId = data.weather[0].icon;
                const linkSrc = 'http://openweathermap.org/img/wn/'+ iconId +'@2x.png';
                document.querySelector('.weather-icon').src = linkSrc;
                console.log( "console log", temp, wthr, iconId)

                // Set DOM Elements from the API
                temperatureDegree.textContent = temp;
                temperatureDescription.textContent = wthr;
                locationTimezone.textContent = data.name;
                
            })
        });
        
    }
    
});