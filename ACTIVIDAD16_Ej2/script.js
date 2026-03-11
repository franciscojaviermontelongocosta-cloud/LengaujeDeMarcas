const currencyEl_one = document.getElementById('currency-one');
const amountEl_one = document.getElementById('amount-one');
const currencyEl_two = document.getElementById('currency-two');
const amountEl_two = document.getElementById('amount-two');
const rateEl = document.getElementById('rate');
const swap = document.getElementById('swap');
const cargando = document.getElementById('cargando');

function showError(input, message) {
    amountEl_two.value = 0;
    const formControl = input.parentElement;
    formControl.className = 'currency error';
    const small = formControl.querySelector('small');
    small.innerText = message;
}

function showSuccess(input) {
    const formControl = input.parentElement;
    formControl.className = 'currency success';
    const small = formControl.querySelector('small');
    if (small) small.innerText = '';
}

function calculate() {
    const moneda1 = currencyEl_one.value;
    const moneda2 = currencyEl_two.value;
    const cantidad1 = amountEl_one.value;

    if (cantidad1 < 0) {
        showError(amountEl_one, 'No se permiten números negativos');
        return;
    } else {
        showSuccess(amountEl_one);
    }

    cargando.style.display = 'block';

    fetch(`https://api.exchangerate-api.com/v4/latest/${moneda1}`)
        .then(function(res) {
            return res.json();
        })
        .then(function(data) {
            const rate = data.rates[moneda2];
            rateEl.innerText = `1 ${moneda1} = ${rate} ${moneda2}`;
            amountEl_two.value = (cantidad1 * rate).toFixed(2);
            
            cargando.style.display = 'none';
        })
        .catch(function(error) {
            cargando.style.display = 'none';
            showError(amountEl_one, 'Error al conectar con la API');
        });
}

currencyEl_one.addEventListener('change', calculate);
amountEl_one.addEventListener('input', calculate);
currencyEl_two.addEventListener('change', calculate);
amountEl_two.addEventListener('input', calculate);

swap.addEventListener('click', function() {
    const temp = currencyEl_one.value;
    currencyEl_one.value = currencyEl_two.value;
    currencyEl_two.value = temp;
    calculate();
});

calculate();