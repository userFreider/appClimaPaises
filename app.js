//obtener variables
const getResultado = document.querySelector('.resultado');
const formulario = document.querySelector('.getForm-weater');
const getCiudad = document.querySelector('#ciudad');
const getPais = document.querySelector('#pais');


formulario.addEventListener('submit', (event) => {
    event.preventDefault();
    //console.log(getCiudad.value);
    //console.log(getPais.value);
    if (getCiudad.value === '' || getPais === '') {
        mostrarError('Ambos campos son obligatorio..')
    }

});



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