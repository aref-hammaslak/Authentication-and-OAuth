const inputSignupEmail = document.querySelector('#input-signup-email');
const inputSignupPassword = document.querySelector('#input-signup-pass');
const inputSignupName = document.querySelector('#input-signup-name');
const forms = document.querySelectorAll('form');
const btnSignupForm = document.querySelector('#btn-signup-form');
const errorParagraph = document.querySelector('#error-paragraph');
const inputSignupConfirmPassword = document.querySelector('#input-signup-confirm-password');



forms.forEach((form) => {
  form.addEventListener('submit', (ev) => {
    ev.preventDefault();

  })
})

const btnFormOnSubmitHandler = (ev, email, password, name = undefined) => {

  const data = {
    email,
    password,
    name
  }
  console.log(data);
  ev.preventDefault();
  fetch('/auth/signup', {
    method: 'POST',
    headers: {
      
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }).then((response) => {
    if(response.status === 200){
      window.location.href = '/login';
    }
    return response.json();

  }).then(data => {
    console.log(data);
    errorParagraph.textContent = data.error;
  })
    .catch((error) => {
      console.log(error);
    })
}

const isPasswordsMatch = () =>{
  return inputSignupPassword.value === inputSignupConfirmPassword.value ;

}

const signupFormSubmit = () => {
  let email, password, name;

  errorParagraph.textContent = '';

  const emailInputOnChangeHandler = (ev) => {
    ev.preventDefault();
    email = ev.target.value
    console.log(email);
  }

  const passInputOnChangeHandler = (ev) => {
    ev.preventDefault();
    console.log(ev.target.validity);
    password = ev.target.value
    console.log(password);
  }

  const nameInputOnChangeHandler = (ev) => {
    ev.preventDefault();
    name = ev.target.value
    console.log(name);
  }

  inputSignupEmail.addEventListener('change', emailInputOnChangeHandler);
  inputSignupPassword.addEventListener('change', passInputOnChangeHandler);
  inputSignupName.addEventListener('change', nameInputOnChangeHandler);
 
  btnSignupForm.addEventListener('click', (ev) => {
    if(!isPasswordsMatch()){
      return errorParagraph.textContent = 'the enterd passwords must match'
    }
    btnFormOnSubmitHandler(ev, email, password, name)
  })


}


signupFormSubmit();