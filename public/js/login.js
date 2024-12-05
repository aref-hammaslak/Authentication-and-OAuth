const inputLoginEmail = document.querySelector('#input-login-email');
const inputLoginPassword = document.querySelector('#input-login-pass');
const btnLoginForm = document.querySelector('#btn-login-form');
const forms = document.querySelectorAll('form');
const errorParagraph = document.querySelector('#error-paragraph');


forms.forEach((form) => {
  form.addEventListener('submit', (ev) => {
     ev.preventDefault();
    
  })
})

const btnFormOnSubmitHandler = (ev, email, password= undefined) => {

  const data = {
    email,
    password,
    
  }
  // ev.preventDefault();
  fetch('/auth/login', {
    method: 'POST',
    headers: {
      //'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then((response) => {
    if(response.status === 200){
      window.location.href = '/';
    }
    console.log(response)
    return response.json();

  }).then((data) => {
    console.log(data);
    errorParagraph.textContent = data.error;
  })
    .catch((error) => {
      console.log(error);
    })
}


const loginFormSubmit = () => {
  let email, password;

  errorParagraph.textContent = '';

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

  inputLoginEmail.addEventListener('change', emailInputOnChangeHandler);
  inputLoginPassword.addEventListener('change', passInputOnChangeHandler);
  btnLoginForm.addEventListener('click', (ev) => {
    btnFormOnSubmitHandler(ev, email, password)
  });


}

loginFormSubmit();