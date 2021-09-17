// import Swal from 'sweetalert2'
const expresiones = {
	usuario: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
	nombre:  /^[a-zA-Z]{2,20}$/, // Letras sin espacios.
	password: /^.{4,12}$/, // 4 a 12 digitos.
	email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	// telefono: /^\d{7,14}$/ // 7 a 14 numeros.
}

const campos = {
	username: false,
	password: false,
    email: false
}


async function alertSwalForgotUsername() {
    const formEmail = document.createElement("div");
    formEmail.innerHTML = `
        <form action="/forgot_user-email" method="POST" id="formEmail">
            <div class="fields">
                <div class="group-input" id="group__email">
                    <i class="fas fa-user-tie"></i>
                    <input type="email" name="email" placeholder="Enter your email address" onkeyup = "window.validateForm(event)" required>
                    <i id = "icon-validate-state__email" class="formulario__validacion-estado fas fa-times-circle"></i>
                </div>
                <p id="inputMessError__email" class= "form__input-error">Email must be entered correctly.</p>
            </div>
            <div class="formulario__mensaje" id="forgotUsernameId__mensaje">
				<p><i class="fas fa-exclamation-triangle"></i> <b>Error:</b> Please fill out this form correctly. </p>
			</div>  
            <button type="button" class="popup-forgot-submitBtn" id="swal_sendEmailButton" onclick = "window.validaEmailSubmit(formEmail)" >Send</button>
        </form>`;

    Swal.fire({
        title: 'Forgot Username',
        html: formEmail,
        showConfirmButton: false,
        allowOutsideClick:false,
        showClass: {
            popup: 'animate__animated animate__lightSpeedInLeft'
          },
          hideClass: {
            popup: 'animate__animated animate__lightSpeedOutRight'
          },
        showCloseButton:true,
    });
}



function alertSwalForgotPassword() {

    const form = document.createElement("div");
    form.innerHTML = `
        <form action="/reset_pass" method="POST" id="myform">
            <div class="group-input-forgotpass" id = "group__username">
                <i class="fas fa-user-tie"></i>
                <input type="text" name="username" id = "swal-input-username" placeholder="Username" onkeyup = "window.validateForm(event)" required>
                <i id = "icon-validate-state__username" class="formulario__validacion-estado fas fa-times-circle"></i>
            </div>
            <p id="inputMessError__username" class= "form__input-error">Username can only use letters, numbers and underscore. Size between 4-16.</p>
            <div class="group-input-forgotpass" id = "group__password">
                <i class="fas fa-lock"></i>
                <input type="password" name="password" id = "swal-input-password1" placeholder="New password" minlength="4" 
                maxlength="12" onkeyup = "window.validateForm(event)" required>
                <i id = "icon-validate-state__password" class="formulario__validacion-estado fas fa-times-circle"></i>
            </div>
            <p id="inputMessError__password" class= "form__input-error">Password must be between 4 and 12 characters.</p>
            <div class="group-input-forgotpass" id = "group__password2">
                <i class="fas fa-lock"></i>
                <input type="password" name="password2" id = "swal-input-password2" placeholder="Confirm new password" minlength="4" 
                maxlength="12" onkeyup = "window.validateForm(event)" required>
                <i id = "icon-validate-state__password2" class="formulario__validacion-estado fas fa-times-circle"></i>
            </div>
            <p id="inputMessError__password2" class= "form__input-error">Passwords does not match.</p> 
            <div class="formulario__mensaje" id="formulario__mensaje">
				<p><i class="fas fa-exclamation-triangle"></i> <b>Error:</b> Please fill out this form correctly. </p>
			</div>   
            <button type="button" class="popup-forgot-submitBtn" id="swal_saveButton" onclick = "window.validaSubmit(myform)" >Save new password</button>
        </form>`;

    Swal.fire({
        title: 'Reset Password',
        html: form,
        showConfirmButton: false,
        allowOutsideClick:false,
        showClass: {
            popup: 'animate__animated animate__lightSpeedInLeft'
          },
          hideClass: {
            popup: 'animate__animated animate__lightSpeedOutRight'
          },
        showCloseButton:true,
    });
}


window.validateForm = function (e) {
	switch (e.target.name) {
		case "username":
			validarCampo(expresiones.usuario, e.target, 'username');
		break;
		case "password":
			validarCampo(expresiones.password, e.target, 'password');
			validarPassword2();
		break;
		case "password2":
			validarPassword2();
		break;
        case "email":
            
            validarCampo(expresiones.email, e.target, 'email');

        break;
	}
}

const validarCampo = (expresion, input, campo) => {
	if(expresion.test(input.value)){

        document.getElementById(`group__${campo}`).classList.remove('form__group-incorrect');
		document.getElementById(`group__${campo}`).classList.add('form__group-correct');
        document.getElementById(`inputMessError__${campo}`).classList.remove('form__input-error-activo');
        document.getElementById(`icon-validate-state__${campo}`).style.visibility = 'visible'
		document.getElementById(`icon-validate-state__${campo}`).classList.add('fa-check-circle');
		document.getElementById(`icon-validate-state__${campo}`).classList.remove('fa-times-circle');
		
		campos[campo] = true;
	} else {
        document.getElementById(`group__${campo}`).classList.add('form__group-incorrect');
		document.getElementById(`group__${campo}`).classList.remove('form__group-correct');
        document.getElementById(`inputMessError__${campo}`).classList.add('form__input-error-activo');
        document.getElementById(`icon-validate-state__${campo}`).style.visibility = 'visible'
		document.getElementById(`icon-validate-state__${campo}`).classList.add('fa-times-circle');
		document.getElementById(`icon-validate-state__${campo}`).classList.remove('fa-check-circle');
		
		campos[campo] = false;
	}
}

const validarPassword2 = () => {
	const inputPassword1 = document.getElementById('swal-input-password1');
	const inputPassword2 = document.getElementById('swal-input-password2');
   
	if(inputPassword1.value !== inputPassword2.value){
        document.getElementById(`inputMessError__password2`).classList.add('form__input-error-activo');
        document.getElementById(`group__password2`).classList.add('form__group-incorrect');
		document.getElementById(`group__password2`).classList.remove('form__group-correct');
        document.getElementById(`icon-validate-state__password2`).style.visibility = 'visible'
		document.getElementById(`icon-validate-state__password2`).classList.add('fa-times-circle');
		document.getElementById(`icon-validate-state__password2`).classList.remove('fa-check-circle');
		
		campos['password'] = false;
	} else {
        document.getElementById(`inputMessError__password2`).classList.remove('form__input-error-activo');
		document.getElementById(`group__password2`).classList.remove('form__group-incorrect');
		document.getElementById(`group__password2`).classList.add('form__group-correct');
        document.getElementById(`icon-validate-state__password2`).style.visibility = 'visible'
		document.getElementById(`icon-validate-state__password2`).classList.add('fa-check-circle');
		document.getElementById(`icon-validate-state__password2`).classList.remove('fa-times-circle');
		campos['password'] = true;
	}
}


window.validaEmailSubmit = function (formEmail){

    if(campos.email){
		formEmail.submit();
	} else {
		document.getElementById('forgotUsernameId__mensaje').classList.add('formulario__mensaje-activo');
        setTimeout(() => {
			document.getElementById('forgotUsernameId__mensaje').classList.remove('formulario__mensaje-activo');
		}, 5000);
	}
}

window.validaSubmit = function (formResetPwd){

    if(campos.username && campos.password){
		formResetPwd.submit();
	} else {
		document.getElementById('formulario__mensaje').classList.add('formulario__mensaje-activo');
        setTimeout(() => {
			document.getElementById('formulario__mensaje').classList.remove('formulario__mensaje-activo');
		}, 5000);
	}
}

function alertSwalDeleteLink(id) {
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
        allowOutsideClick:false,

    }).then((result) => {
        
        if (result.isConfirmed) {
            window.location = `/links/delete/${id}`;
            // _link_delete_link.href=`/links/delete/${id}`;
            // _link_delete_link.click();

            // Swal.fire({
            //     title: 'Deleted!',
            //     text: 'Your link has been deleted.',
            //     icon: 'success',
            //     allowOutsideClick:false,
            // })
        }
    })
}

function alertSwalUsername(username){
    Swal.fire({
        title: `Your username is: ${username}`,
        icon: 'success',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'OK',
        showClass: {
            popup: 'animate__animated animate__backInDown'
          },
          hideClass: {
            popup: 'animate__animated animate__backOutDown'
          },
        allowOutsideClick:false,
    }); 
    // .then(function() {
    //     window.location = "/signin";
    // });

}

function alertSwalMessage(message, isSuccess){
    if (isSuccess){
        Swal.fire({
            title: message,
            icon: 'success',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK',
            showClass: {
                popup: 'animate__animated animate__backInDown'
              },
              hideClass: {
                popup: 'animate__animated animate__backOutDown'
              },
            allowOutsideClick:false,
        });
        // .then(function() {
        //     window.location = "/signin";
        // });
    }else{
        Swal.fire({
            title: message,
            icon: 'error',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK',
            showClass: {
                popup: 'animate__animated animate__backInDown'
              },
              hideClass: {
                popup: 'animate__animated animate__backOutDown'
              },
            allowOutsideClick:false,
        });
        // .then(function() {
        //     window.location = "/signin";
        // });
    }
}

