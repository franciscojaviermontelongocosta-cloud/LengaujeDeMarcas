let PrecioEntrda = 10;
let Moneda = 'USD';
let Cambio = 1;
let AsientosSeleccionados = [];

let container = document.querySelector('.container');
let seats = document.querySelectorAll('.row .seat:not(.occupied)');
let count = document.getElementById('count');
let total = document.getElementById('total');
let coin = document.getElementById('coin');
let movieSelect = document.getElementById('movie');
let currencySelect = document.getElementById('currency-one');
let loadingDiv = document.getElementById('cargando');

populateUI();

currencySelect.onchange = function () {
    let nuevaMoneda = currencySelect.value;
    obtenerTasaCambio(nuevaMoneda);
};

movieSelect.onchange = function () {
    PrecioEntrda = parseFloat(movieSelect.value);
    setMovieData(movieSelect.selectedIndex, PrecioEntrda);
    updateSelectedCount();
};

container.onclick = function (event) {
    if (event.target.classList.contains('seat') &&
        !event.target.classList.contains('occupied')) {

        if (event.target.classList.contains('selected')) {
            event.target.classList.remove('selected');
        } else {
            event.target.classList.add('selected');
        }

        updateSelectedCount();
    }
};

async function obtenerTasaCambio(moneda) {
    loadingDiv.style.display = 'block';

    try {
        let respuesta = await fetch('https://api.exchangerate-api.com/v4/latest/USD');

        if (respuesta.ok) {
            let data = await respuesta.json();
            Cambio = data.rates[moneda];
            Moneda = moneda;

            updateSelectMovie(Cambio, Moneda);
            updateSelectedCount();
            coin.innerText = Moneda;
            localStorage.setItem('moneda', Moneda);
        }

    } catch (error) {
        console.error('Error:', error);
        alert('Error obteniendo tasa de cambio. Usando USD.');
    }

    loadingDiv.style.display = 'none';
}
function updateSelectMovie(rate, coin) {
    let opciones = movieSelect.getElementsByTagName('option');
    for (let i = 0; i < opciones.length; i++) {
        let precioBase = parseFloat(opciones[i].value);
        let nuevoPrecio = (precioBase * rate).toFixed(2);
        let textoOriginal = opciones[i].innerText.split('(')[0];
        opciones[i].innerText = textoOriginal + ' (' + nuevoPrecio + ' ' + coin + ')';
    }
}

function updateSelectedCount() {
    let asientosSeleccionados = document.querySelectorAll('.row .seat.selected');
    let cantidad = asientosSeleccionados.length;

    let precioTotal = (PrecioEntrda * Cambio * cantidad).toFixed(2);

    count.innerText = cantidad;
    total.innerText = precioTotal;

    guardarAsientos();
}

function setMovieData(movieIndex, moviePrice) {
    localStorage.setItem('selectedMovieIndex', movieIndex);
    localStorage.setItem('PrecioEntrda', moviePrice);
}

function populateUI() {
    let monedaGuardada = localStorage.getItem('moneda');
    if (monedaGuardada && monedaGuardada !== 'USD') {
        currencySelect.value = monedaGuardada;
        obtenerTasaCambio(monedaGuardada);
        coin.innerText = monedaGuardada;
    }

    let peliculaGuardada = localStorage.getItem('selectedMovieIndex');
    if (peliculaGuardada !== null) {
        movieSelect.selectedIndex = parseInt(peliculaGuardada);
        PrecioEntrda = parseFloat(localStorage.getItem('PrecioEntrda') || movieSelect.value);
    }

    let asientosGuardados = JSON.parse(localStorage.getItem('asientos'));
    if (asientosGuardados !== null && Array.isArray(asientosGuardados)) {
        for (let i = 0; i < asientosGuardados.length; i++) {
            let indice = asientosGuardados[i];
            if (seats[indice]) {
                seats[indice].classList.add('selected');
            }
        }
    }

    updateSelectedCount();
}

function guardarAsientos() {
    let indices = [];
    for (let i = 0; i < seats.length; i++) {
        if (seats[i].classList.contains('selected')) {
            indices.push(i);
        }
    }
    localStorage.setItem('asientos', JSON.stringify(indices));
}