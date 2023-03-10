//obtener variables
const getResultado = document.querySelector('.resultado');
const formulario = document.querySelector('.getForm-weater');
const getCiudad = document.querySelector('#ciudad');
const getPais = document.querySelector('#pais');


formulario.addEventListener('submit', (event) => {
    event.preventDefault();
    //console.log(getCiudad.value);
    //console.log(getPais.value);
    if (getCiudad.value === '' || getPais.value === '') {
        mostrarError('Ambos campos son obligatorio..')
        return; // salir automaticamente
    }


    //crear api clima
    callApiClima(getCiudad.value, getPais.value);

});



//funcion crear api

function callApiClima(ciudad, pais) {

    const api_key = 'b2f47960cb92c1d77b83d34ed9914baa';
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${api_key}`;

    fetch(url)
        .then((res) => res.json())
        .then((datos) => {
            if (datos.cod === '404') {
                mostrarError('la ciuda no se encuentra..')
            } else {
                clearHtml();
                showInformacioClima(datos)
            }
            console.log(datos)
        }).catch(error => {
            console.log(error)
        })

}

function showInformacioClima(datos) {
    //desctructuracion
    const { name, main: { temp, temp_min, temp_max }, weather: [arr] } = datos;

    const addGrados = kelvinToCentigrado(temp);

    const content = document.createElement('div');
    content.innerHTML = `
    <h5>Clima en ${name} </h5>
        <img src="https://openweathermap.org/img/wn/${arr.icon}@2x.png" alt="iconos clima">
        <h2 class="fw-bold">${addGrados}°C</h2>
        <p>Max: ${temp_max} °C</p>
        <p>Min: ${temp_min} °C</p>
    `;

getResultado.appendChild(content);

   /* console.log(name)
    console.log(temp)
    console.log(temp_min)
    console.log(temp_max)
    console.log(arr.icon)*/

}

//agregar al resultado elemnto padre
getResultado.appendChild(content)




//mostrar funcion  mensaje tipo error
function mostrarError(mensaje) {
    console.log(mensaje)
    const alerta = document.createElement('p');
    alerta.classList.add('alert-message');
    alerta.innerHTML = mensaje;

    //eliminar mis mensaje despues de dos segundo
    formulario.appendChild(alerta);
    setTimeout(() => {
        alerta.remove();
    }, 2500)
}




//rondear temperatura
function kelvinToCentigrado(temp){
    return parseInt(temp - 273.15);
}



//funcion para limpiar mi html
function clearHtml(){
    getResultado.innerHTML = '';
}