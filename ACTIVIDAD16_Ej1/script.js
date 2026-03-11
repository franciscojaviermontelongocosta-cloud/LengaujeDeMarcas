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

// 3. Cuando el usuario hace clic en el botón de enviar
form.addEventListener('submit', function(event) {
    event.preventDefault();

    // VALIDACIÓN DE NOMBRE
    if (username.value.trim() === '') {
        mostrarError(username, 'El nombre es obligatorio');
    } else if (username.value.length < 3) {
        mostrarError(username, 'Debe tener al menos 3 letras');
    } else {
        mostrarExito(username);
    }

    // VALIDACIÓN DE EMAIL
    const expresionEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (email.value.trim() === '') {
        mostrarError(email, 'El email es obligatorio');
    } else if (!expresionEmail.test(email.value)) {
        mostrarError(email, 'El email no es válido');
    } else {
        mostrarExito(email);
    }

    // VALIDACIÓN DE CONTRASEÑAS
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

    // VALIDACIÓN DE EDAD
    const numeroEdad = Number(edad.value);
    if (edad.value === '') {
        mostrarError(edad, 'Pon tu edad');
    } else if (numeroEdad < 0 || numeroEdad >= 999) {
        mostrarError(edad, 'Debe ser entre 0 y 998');
    } else {
        mostrarExito(edad);
    }

    // VALIDACIÓN DE URL
    const expresionUrl = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
    if (url.value === '') {
        mostrarError(url, 'La URL es obligatoria');
    } else if (!expresionUrl.test(url.value)) {
        mostrarError(url, 'Formato incorrecto (ej: http://google.com)');
    } else {
        mostrarExito(url);
    }
});