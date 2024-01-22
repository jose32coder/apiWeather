const app = document.querySelector('.weather-app');
const temp = document.querySelector('.temp');
const dateOutput = document.querySelector('.date');
const timeOutput = document.querySelector('.time');
const conditionOutput = document.querySelector('.condition');
const nameOutput = document.querySelector('.name');
const icon = document.querySelector('.icon');
const cloudOutput = document.querySelector('.cloud');
const humidityOutput = document.querySelector('.humitidy');
const windOutput = document.querySelector('.wind');
const form = document.querySelector('#locationInput');
const search = document.querySelector('.search');
const btn = document.querySelector('.submit');
const cities = document.querySelectorAll('.city');


let cityInput = "Agua Blanca, Portuguesa, Venezuela";

cities.forEach((city) =>{
    console.log('hola')

    city.addEventListener('click', e => {
        cityInput = e.target.innerHTML;

        fetchWeatherData();
        app.style.opacity = "0"
    })
})

form.addEventListener('submit', e => {
    if (search.value.length == 0) {
        Swal.fire({
            title: "Campo vacío",
            text: "Asegurate de escribir algo para poder buscar",
            timer: 3500
          });
    }
    else{
        cityInput = search.value;
        fetchWeatherData();
        search.value = "";
        app.style.opacity = "0"
    }
    e.preventDefault();
});



// Esta funcion va a retornar el dia de la semana y la fecha en formato date ej: (26/07/2022)
function dayOfTheWeek(day, month, year) {
    const weekday = [
        "Domingo",
        "Lunes",
        "Martes",
        "Miercoles",
        "Jueves",
        "Viernes",
        "Sabado"
    ];
    return weekday[new Date(`${day}/${month}/${year}`).getDay()];
};
 // Funcion que despliega la API del clima

function fetchWeatherData(){
    // Conexion a data dinamica de api
    fetch(`https://api.weatherapi.com/v1/current.json?key=10c1857a51c4407a8d4211634242001&q=${cityInput}&aqi=yes`)
    
    //Obtengo el formato del JSON y convierto los onjetos en objetos regulares del JS

    .then(response => response.json())
    .then(data => {
        // Verifico por el console.log los datos disponibles que quiera usar
        console.log(data);

        temp.innerHTML = data.current.temp_c + '&#176;';
        conditionOutput.innerHTML = data.current.condition.text;

        // Obtengo la fecha y el tiempo de la ciudad y extraigo el dia, mes y año como informacion en una variable individual


        const date = data.location.localtime;
        const y = parseInt(date.substr(0, 4));
        const m = parseInt(date.substr(5, 2));
        const d = parseInt(date.substr(8, 2));
        const time = date.substr(11);

        // Voy a reformar el formato original de
        // 26/07/2022 05:27 al nuevo formato que es
        // 05:27 - Lunes 26, 07 2022

        dateOutput.innerHTML = `${dayOfTheWeek(y, m, d)} ${d}, ${m} ${y}`;
        timeOutput.innerHTML = time;

        // Agrego el nombre de la ciudad a la pagina;
        nameOutput.innerHTML = data.location.name;
        
        // Obtengo el icono de la url de la api y extraigo lo extraigo por parte

        const iconId = data.current.condition.icon.substr(`//cdn.weatherapi.com/weather/64x64/`.length);


// cambio el formato del icono a mi carpeta de iconos y lo agrego a la pagina
        icon.src = './icons/' + iconId;

        // Agrego detalles a la pagina
        cloudOutput.innerHTML = data.current.cloud + '%';
        humidityOutput.innerHTML = data.current.humidity + '%';
        windOutput.innerHTML = data.current.wind_kph + '%';
        
        console.log('llega aqui')
        // coloco el dia por defecto
        let timeOfDay = 'day';
        
        // obtengo el id unico para la condicion 
        const code = data.current.condition.code;

        // cambio a noche si es de noche en la ciudad
        if (!data.current.is_day) {
            timeOfDay = 'night'
        }
        
        if (code == 1000) {
            // cambio la imagen de fondo
            app.style.backgroundImage = `url(./img/${timeOfDay}/clear.jpg)`;

            // cambio el boton de color si es de noche
            btn.style.background = '#e5ba92';
            if (timeOfDay == 'night') {
                btn.style.background = '#181e27'
            }
        }
        else if (
            code == 1003 || 
            code == 1006 || 
            code == 1009 || 
            code == 1030 || 
            code == 1069 || 
            code == 1087 || 
            code == 1135 || 
            code == 1273 || 
            code == 1276 || 
            code == 1279 || 
            code == 1282
            ){
                app.style.backgroundImage = `url(./img/${timeOfDay}/cloudy.jpg)`;
                btn.style.background = '#fa6d1b'
            if (timeOfDay == 'night') {
                btn.style.background = "181e27"
            }
        }
        else if (
            code == 1063 ||
            code == 1069 || 
            code == 1072 || 
            code == 1150 || 
            code == 1153 || 
            code == 1180 || 
            code == 1183 || 
            code == 1186 || 
            code == 1189 || 
            code == 1192 || 
            code == 1195 || 
            code == 1204 || 
            code == 1207 || 
            code == 1240 || 
            code == 1243 || 
            code == 1246 || 
            code == 1249 || 
            code == 1252
            ){
            app.style.backgroundImage = `url(./img/${timeOfDay}/rainy.jpg)`;
            btn.style.background = '#647d75'
            if (timeOfDay == 'night') {
                btn.style.background = "#325c80"
            }
        }
        else{
            app.style.background = `url(./img/${timeOfDay}/snowy.jpg)`;
            btn.style.background = '#4d72aa';
            if (timeOfDay == 'night') {
                btn.style.background = "#1b1b1b"
            }
        }
        app.style.opacity = '1';
    })
    .catch(() => {
        Swal.fire({
            title: "Ciudad no encontrada",
            text: "Asegurate de colocar un lugar existente",
            timer: 3500
          });
        app.style.opacity = '1';
    });
}


fetchWeatherData();

app.style.opacity = '1'



// // Llamado de todos los datos colocados en el DOM

// const app = document.querySelector('.weather-app');
// const temp = document.querySelector('.temp');
// const dateOutput = document.querySelector('.date');
// const timeOutput = document.querySelector('.time');
// const conditionOutput = document.querySelector('.condition');
// const nameOutput = document.querySelector('.name');
// const icon = document.querySelector('.icon');
// const cloudOutput = document.querySelector('.cloud');
// const humidityOutput = document.querySelector('.humitidy');
// const windOutput = document.querySelector('.wind');
// const form = document.querySelector('#locationInput');
// const search = document.querySelector('.search');
// const btn = document.querySelector('.submit');
// const cities = document.querySelectorAll('.city');


// console.log(cities)

// window.addEventListener('DOMContentLoaded', () =>{
//     console.log('loaded');
//     fetchWeatherData();
// })
// search.addEventListener('keyup', e =>{
//     console.log(search.value)
// })

// let cityInput = "Agua Blanca, Portuguesa, Venezuela";

// cities.forEach((city) =>{
//     console.log('hola')
//     city.addEventListener('click', e => {
//         cityInput = e.target.innerHTML;
//         console.log('llego')
//         console.log(e)

        
//         fetchWeatherData();
//         app.style.opacity = "0"
//     })
// })

// form.addEventListener('submit', e => {
//     if (search.value.length == 0) {
//         alert('Campo vacío')
//     }
//     else{
//         cityInput = search.value;
//         fetchWeatherData();
//         search.value = "";
//         app.style.opacity = "0"
//     }
//     e.preventDefault();
// });

// // Esta funcion va a retornar el dia de la semana y la fecha en formato date ej: (26/07/2022)

// function dayOfTheWeek(day, month, year) {
//     const weekday = [
//         "Domingo",
//         "Lunes",
//         "Martes",
//         "Miercoles",
//         "Jueves",
//         "Viernes",
//         "Sabado"
//     ];
//     return weekday[new Date(`${day}/${month}/${year}`).getDay()];
// };

// // Funcion que despliega la API del clima

// function fetchWeatherData(){
//     // Conexion a data dinamica de api
//     fetch(`https://api.weatherapi.com/v1/current.json?key=10c1857a51c4407a8d4211634242001&q=${cityInput}&aqi=yes`)
    
//     //Obtengo el formato del JSON y convierto los onjetos en objetos regulares del JS

//     .then(response => response.json())
//     .then(data => {
//         // Verifico por el console.log los datos disponibles que quiera usar
//         console.log(data);

//         // modifico la temperatura
//         temp.innerHTML = data.current.temp_c + '&#176;';
//         conditionOutput.innerHTML = data.current.condition.text;

//         // Obtengo la fecha y el tiempo de la ciudad y extraigo el dia, mes y año como informacion en una variable individual


//         const date = data.location.localtime;
//         const y = parseInt(date.substr(0, 4));
//         const m = parseInt(date.substr(5, 2));
//         const d = parseInt(date.substr(8, 2));
//         const time = date.substr(11);

//         // Voy a reformar el formato original de
//         // 26/07/2022 05:27 al nuevo formato que es
//         // 05:27 - Lunes 26, 07 2022

//         dateOutput.innerHTML = `${dayOfTheWeek(d, m, y)} ${d}, ${m} ${y}`;
//         timeOutput.innerHTML = time;

//         // Agrego el nombre de la ciudad a la pagina;
//         nameOutput.innerHTML = data.location.name;
        
//         // Obtengo el icono de la url de la api y extraigo lo extraigo por parte

//         const iconId = data.current.condition.icon.substr(`//cdn.weatherapi.com/weather/64x64/`.length);

//         // cambio el formato del icono a mi carpeta de iconos y lo agrego a la pagina
//         icon.src = '../icons/64x64' + iconId;

//         // Agrego detalles a la pagina
//         cloudOutput.innerHTML = data.current.cloud + '%';
//         humidityOutput.innerHTML = data.current.humidity + '%';
//         windOutput.innerHTML = data.current.wind_kph + '%';
        
//         console.log('llega aqui')
//         // coloco el dia por defecto
//         let timeOfDay = 'day';
        
//         // obtengo el id unico para la condicion 
//         const code = data.current.condition.code;

//         // cambio a noche si es de noche en la ciudad
//         if (!data.current.is_day) {
//             timeOfDay = 'night'
//         }
        
//         if (code == 1000) {
//             // cambio la imagen de fondo
//             app.style.backgroundImage = `url(../img/${timeOfDay}/clear.jpg)`;

//             // cambio el boton de color si es de noche
//             btn.style.background = '#e5ba92';
//             if (timeOfDay == 'night') {
//                 btn.style.background = '#181e27'
//             }
//         }
//         else if (code == 1003 || code == 1006 || code == 1009 || code == 1030 || code == 1063 || code == 1069 || code == 1087 || code == 1135 || code == 1273 || code == 1276 || code == 1279 || code == 1282){
//             app.style.backgroundImage = `url(../img/${timeOfDay}/cloudy.jpg)`;
//             btn.style.background = '#fa6d1b'
//             if (timeOfDay == 'night') {
//                 btn.style.background = "181e27"
//             }
//         }
//         else if (code == 1069 || code == 1072 || code == 1150 || code == 1153 || code == 1180 || code == 1183 || code == 1186 || code == 1189 || code == 1192 || code == 1195 || code == 1204 || code == 1207 || code == 1240 || code == 1243 || code == 1246 || code == 1249 || code == 1252){
//             app.style.backgroundImage = `url(../img/${timeOfDay}/rainy.jpg)`;
//             btn.style.background = '#647d75'
//             if (timeOfDay == 'night') {
//                 btn.style.background = "#325c80"
//             }
//         }
//         else{
//             app.style.background = `url(../img/${timeOfDay}/snowy.jpg)`;
//             btn.style.background = '#4d72aa';
//             if (timeOfDay == 'night') {
//                 btn.style.background = "#1b1b1b"
//             }
//         }
//         app.style.opacity = '1';
//     })
//     .catch(() => {
//         alert('Ciudad no encontrada, por favor ingresa otra');
//         app.style.opacity = '1';
//     });
// }


// app.style.opacity = '1';
