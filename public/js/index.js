
const inputLoginEmail = document.querySelector('#input-login-email');
const inputLoginPassword = document.querySelector('#input-login-pass');
const inputSignupEmail = document.querySelector('#input-signup-email');
const inputSignupPassword = document.querySelector('#input-signup-pass');
const inputSignupName= document.querySelector('#input-signup-name');
  
const btnLoginForm = document.querySelector('#btn-login-form');
const btnSignupForm = document.querySelector('#btn-signup-form');
const forms = document.querySelectorAll('form');


forms.forEach((form) => {
  form.addEventListener('submit', (ev) => {
    ev.preventDefault();

  })
})

const emailInputOnChangeHandler = (ev) => {
    ev.preventDefault();
    email = ev.target.value
    console.log(email);
  }

const passInputOnChangeHandler = (ev) => {
    ev.preventDefault();
    password = ev.target.value
    console.log(password);
  }

const nameInputOnChangeHandler = (ev) => {
    ev.preventDefault();
    name = ev.target.value
    console.log(name);
  }

const btnFormOnSubmitHandler = (ev, email, password , name= undefined) => {
   
    const data = {
      email,
      password,
      name
    }
    ev.preventDefault();
    fetch('/auth/login' , {
      method: 'POST',
      headers: {
        'Accept': 'text/html; charset=UTF-8',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then((response) => {

      console.log(response);
      return response;

    }).then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.log(error);
    })
  }

const loginFormSubmit = () => {
  let email , password ;
  inputLoginEmail.addEventListener('change' , emailInputOnChangeHandler);
  inputLoginPassword.addEventListener('change' , passInputOnChangeHandler);
  btnLoginForm.addEventListener('click' , btnFormOnSubmitHandler.bind(null, email, password));

  
}

const signupFormSubmit= () => {
  let email , password ,name ;
  inputSignupEmail.addEventListener('change' , emailInputOnChangeHandler);
  inputSignupPassword.addEventListener('change' , passInputOnChangeHandler);
  inputSignupName.addEventListener('change' , nameInputOnChangeHandler);
  btnLoginForm.addEventListener('click' , btnFormOnSubmitHandler.bind(null, email, password , name))
  
  
}


loginFormSubmit();
signupFormSubmit();