//FORMULARIO --------------------------------

//lo que va a permitir que se conecte al formulario
const formulario = document.getElementById('formulario_');
const inputs = document.querySelectorAll('#formulario_ input');

//objeto con propiedades que va a permitir lo que el usuario pueda colocar
const expresiones = {
    //que comience y termine con algunos de esos caracteres; y tenga esa cantidad de caracteres
	nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
	email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    asunto: /^[a-zA-ZÀ-ÿ\s]{1,40}$/
}
const campos = {
	nombre: false,
	email: false,
	asunto: false
}

const validarFormulario = (e) => {
    switch (e.target.name){
        case "introducir_nombre":
            validarCampo(expresiones.nombre, e.target, 'nombre');
            
        break;
        case "introducir_email":
            validarCampo(expresiones.email, e.target, 'email');
        

        break;
        case "introducir_asunto":
            validarCampo(expresiones.asunto, e.target, 'asunto');

        break;
    }
}


//lo que sucede cuando escribo en los inputs
const validarCampo = (expresion, input, campo) => {
    if(expresion.test(input.value)){
        document.getElementById(`grupo_${campo}`).classList.add('formulario_grupo-correcto');
        document.getElementById(`grupo_${campo}`).classList.remove('formulario_grupo-incorrecto');
        document.querySelector(`#grupo_${campo} i`).classList.add('fa-check-circle');
        document.querySelector(`#grupo_${campo} i`).classList.remove('fa-times-circle');
        document.querySelector(`#grupo_${campo} .formulario__input-error`).classList.remove('formulario__input-error-activo');
        campos[campo] = true;
    } else {
        document.getElementById(`grupo_${campo}`).classList.add('formulario_grupo-incorrecto');
        document.getElementById(`grupo_${campo}`).classList.remove('formulario_grupo-correcto');
        document.querySelector(`#grupo_${campo} i`).classList.add('fa-times-circle');
        document.querySelector(`#grupo_${campo} i`).classList.remove('fa-check-circle');
        document.querySelector(`#grupo_${campo} .formulario__input-error`).classList.add('formulario__input-error-activo');
        campos[campo] = false;
    }
}

//por cada inputs ejecute un código
inputs.forEach((input) => {
    input.addEventListener('keyup', validarFormulario); //cuando presiono una tecla ya esta ejecutando la función
    input.addEventListener('blur', validarFormulario); //cuando escribo y presiono cualquier parte de la pantalla ya esta validando

});

//lo que sucede cuando presiono el botón de enviar
formulario.addEventListener('submit', (e) => {
    e.preventDefault();

    if(campos.nombre && campos.email && campos.asunto){
        formulario.reset();

        document.getElementById('formulario__mensaje-exito').classList.add('formulario__mensaje-exito-activo');
		//setimeout para que el mensaje se elimine al cabo de unos segundos
        setTimeout(() => {
			document.getElementById('formulario__mensaje-exito').classList.remove('formulario__mensaje-exito-activo');
		}, 5000);

        //para que se elimines los iconos
		document.querySelectorAll('.formulario_grupo-correcto').forEach((icono) => {
			icono.classList.remove('formulario_grupo-correcto');
		});
        
    } else{
        document.getElementById('formulario__mensaje').classList.add('formulario__mensaje-activo');
        setTimeout(() => {
        document.getElementById('formulario__mensaje').classList.remove('formulario__mensaje-activo');
        },5000);
    }

});
