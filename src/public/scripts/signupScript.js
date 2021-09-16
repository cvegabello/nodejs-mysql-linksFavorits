const expresions = {
	usuario: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
	nombre:  /^[a-zA-Z]{2,20}$/, // Letras sin espacios.
	password: /^.{4,12}$/, // 4 a 12 digitos.
	email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	// telefono: /^\d{7,14}$/ // 7 a 14 numeros.
}

const fields = {
    fullname:false,
	username: false,
	password: false,
    email: false
}

function validateFormSignup(e) {
    switch (e.target.name) {
      case "fullname":
        validarField(expresions.nombre, e.target, 'fullname');
      break;
          case "username":
            validarField(expresiones.usuario, e.target, 'username');
          break;
          case "password":
            validarField(expresiones.password, e.target, 'password');
            validarSignupPassword2();
          break;
          case "password2":
            validarSignupPassword2();
          break;
          case "email":
              
            validarField(expresiones.email, e.target, 'email');
  
          break;
      }
  }
  
  function validarField(expresion, input, campo) {
      const _fullName = document.getElementById(`groupSignup__${campo}`);
      if(expresion.test(input.value)){
          _fullName.classList.remove('form__group-incorrect');
          _fullName.classList.add('form__group-correct');
          document.getElementById(`inputMessError__${campo}`).classList.remove('form__input-error-activo');
          document.getElementById(`icon-validate-state__${campo}`).style.visibility = 'visible'
          document.getElementById(`icon-validate-state__${campo}`).classList.add('fa-check-circle');
          document.getElementById(`icon-validate-state__${campo}`).classList.remove('fa-times-circle');
         fields[campo] = true;
      } else {
          _fullName.classList.add('form__group-incorrect');
          _fullName.classList.remove('form__group-correct');
          document.getElementById(`inputMessError__${campo}`).classList.add('form__input-error-activo');
          document.getElementById(`icon-validate-state__${campo}`).style.visibility = 'visible'
          document.getElementById(`icon-validate-state__${campo}`).classList.add('fa-times-circle');
          document.getElementById(`icon-validate-state__${campo}`).classList.remove('fa-check-circle');
          
        fields[campo] = false;
      }
  
  }

  function validarSignupPassword2(){
    const _inputPassword1 = document.getElementById('inputPassword1');
	const _inputPassword2 = document.getElementById('inputPassword2');
   
	if(_inputPassword1.value !== _inputPassword2.value){
        document.getElementById(`inputMessError__password2`).classList.add('form__input-error-activo');
        document.getElementById(`groupSignup__password2`).classList.add('form__group-incorrect');
		document.getElementById(`groupSignup__password2`).classList.remove('form__group-correct');
        document.getElementById(`icon-validate-state__password2`).style.visibility = 'visible'
		document.getElementById(`icon-validate-state__password2`).classList.add('fa-times-circle');
		document.getElementById(`icon-validate-state__password2`).classList.remove('fa-check-circle');
		
		fields['password'] = false;
	} else {
        document.getElementById(`inputMessError__password2`).classList.remove('form__input-error-activo');
		document.getElementById(`groupSignup__password2`).classList.remove('form__group-incorrect');
		document.getElementById(`groupSignup__password2`).classList.add('form__group-correct');
        document.getElementById(`icon-validate-state__password2`).style.visibility = 'visible'
		document.getElementById(`icon-validate-state__password2`).classList.add('fa-check-circle');
		document.getElementById(`icon-validate-state__password2`).classList.remove('fa-times-circle');
		fields['password'] = true;
	}
  }

  function validaSignUpSubmit (formSignUp){
    //   alert(fields.fullname + "|" + fields.username + "|" +  fields.password + "|" +  fields.email );

    if(fields.fullname && fields.username && fields.password && fields.email){
		formSignUp.submit();
	} else {
		document.getElementById('signupId__mensaje').classList.add('formulario__mensaje-activo');
        setTimeout(() => {
			document.getElementById('signupId__mensaje').classList.remove('formulario__mensaje-activo');
		}, 5000);
	}
}