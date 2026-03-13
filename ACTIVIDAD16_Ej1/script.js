const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const confirmpassword = document.getElementById('confirmpassword');
const edad = document.getElementById('edad');
const url = document.getElementById('url');

function mostrarError(input, mensaje) {
    const padre = input.parentElement;
    padre.className = 'form-control error';
    const textoError = padre.querySelector('small');
    textoError.innerText = mensaje;
}

function mostrarExito(input) {
    const padre = input.parentElement;
    padre.className = 'form-control success';
}

form.addEventListener('submit', function (event) {
    event.preventDefault();

    if (username.value.trim() === '') {
        mostrarError(username, 'El nombre es obligatorio');
    } else if (username.value.length < 3) {
        mostrarError(username, 'Debe tener al menos 3 letras');
    } else {
        mostrarExito(username);
    }

    if (email.value.trim() === '') {
        mostrarError(email, 'El email es obligatorio');
    } else if (!email.value.includes('@') || !email.value.includes('.')) {
        mostrarError(email, 'Email inválido (ej: user@dominio.com)');
    } else {
        mostrarExito(email);
    }

    if (password.value === '') {
        mostrarError(password, 'La contraseña es obligatoria');
    } else if (password.value.length < 6) {
        mostrarError(password, 'Mínimo 6 caracteres');
    } else {
        mostrarExito(password);
    }

    if (confirmpassword.value === '') {
        mostrarError(confirmpassword, 'Repite la contraseña');
    } else if (password.value !== confirmpassword.value) {
        mostrarError(confirmpassword, 'Las contraseñas no coinciden');
    } else {
        mostrarExito(confirmpassword);
    }

    const numeroEdad = Number(edad.value);
    if (edad.value === '') {
        mostrarError(edad, 'Pon tu edad');
    } else if (numeroEdad < 0 || numeroEdad >= 999) {
        mostrarError(edad, 'Debe ser entre 0 y 998');
    } else {
        mostrarExito(edad);
    }

    if (url.value === '') {
        mostrarError(url, 'La URL es obligatoria');
    } else if (!url.value.includes('http') || !url.value.includes('.')) {
        mostrarError(url, 'Debe empezar con http y tener punto (.)');
    } else {
        mostrarExito(url);
    }
});