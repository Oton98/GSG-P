const formulario = document.getElementById('formulario'); // Selecciona el formulario
const inputs = document.querySelectorAll('#formulario input'); // Selecciona del formulario, todas las etiquetas "Input"

const expresiones = {
	usuario: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
	nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
	password: /^.{4,12}$/, // 4 a 12 digitos.
	correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	telefono: /^\d{7,14}$/ // 7 a 14 numeros.
}

const campos = {
    id: false,
    nombre: false,
    password: false,
    correo: false
}

const validarFormulario = (e) => {
    switch (e.target.name) {
        case "usuario":
           validarCampos(expresiones.usuario, e.target, 'id');
        break;
        case "nombre":
            validarCampos(expresiones.nombre, e.target, 'nombre');
        break;
        case "password":
            validarCampos(expresiones.password, e.target, 'password');
            validarPassword2()
        break;
        case "password2":
            validarPassword2();
        break;
        case "correo":
            validarCampos(expresiones.correo, e.target, 'correo');
        break;
    }
       
}

const validarCampos = (expresion, input, campo) => { //expresion que va a tomar del objeto de expresiones, el input que voy a seleccionar del html 
    if (expresion.test(input.value)) {
        document.getElementById(`${campo}group`).classList.remove('formgroup-incorrecto');
        document.getElementById(`${campo}group`).classList.add('formgroup-correcto');
        document.querySelector(`#${campo}group i`).classList.remove('fa-circle-xmark');
        document.querySelector(`#${campo}group i`).classList.add('fa-circle-check');
        document.querySelector(`#${campo}group .formularioerror`).classList.remove('formularioerror-activo');
        campos [campo] = true;


    } else{
        document.getElementById(`${campo}group`).classList.add('formgroup-incorrecto');
        document.getElementById(`${campo}group`).classList.remove('formgroup-correcto');
        document.querySelector(`#${campo}group i`).classList.add('fa-circle-xmark');
        document.querySelector(`#${campo}group i`).classList.remove('fa-circle-check');
        document.querySelector(`#${campo}group .formularioerror`).classList.add('formularioerror-activo');
        campos [campo] = false;
    }
}

const validarPassword2 = () => {
    const inputPassword = document.getElementById('password');
    const inputPassword2 = document.getElementById('password2');
    if (inputPassword.value !== inputPassword2.value) {
        document.getElementById(`password2group`).classList.add('formgroup-incorrecto');
        document.getElementById(`password2group`).classList.remove('formgroup-correcto'),
        document.querySelector(`#password2group i`).classList.add('fa-circle-xmark');
        document.querySelector(`#password2group i`).classList.remove('fa-circle-check');
        document.querySelector(`#password2group .formularioerror`).classList.add('formularioerror-activo');
        campos [password] = false;
    } else {
        document.getElementById(`password2group`).classList.remove('formgroup-incorrecto');
        document.getElementById(`password2group`).classList.add('formgroup-correcto'),
        document.querySelector(`#password2group i`).classList.remove('fa-circle-xmark');
        document.querySelector(`#password2group i`).classList.add('fa-circle-check');
        document.querySelector(`#password2group .formularioerror`).classList.remove('formularioerror-activo');
        campos [password] = true;
    }
}


inputs.forEach((input) => {
    input.addEventListener('keyup', validarFormulario)
    input.addEventListener('blur', validarFormulario)  
})

formulario.addEventListener('submit', (e) => {
    e.preventDefault();

    const terminos = document.getElementById('terminos');
    if (campos.id && campos.nombre && campos.password && campos.correo && terminos.checked) {

        document.getElementById('formularioenviado').classList.add('formularioenviado-activo');
        document.getElementById('formulariomensaje').classList.remove('formulariomensaje-activo');
        
    } else {
        document.getElementById('formulariomensaje').classList.add('formulariomensaje-activo');
    }
} )

