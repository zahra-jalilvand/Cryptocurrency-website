import {Authentication} from '../../utils/auth.js' ;
import {LocalStorageData} from '../../utils/storage.js';

const signUpForm = document.querySelector('.signup');
const messagePreview = document.querySelector('.message');
const messagePrevieww = document.querySelector('.message1');
const forms = document.querySelector(".forms");
const pwShowHide = document.querySelectorAll(".eye-icon");
const links = document.querySelectorAll(".link");

pwShowHide.forEach(eyeIcon => {
eyeIcon.addEventListener("click", () => {
  const pwFields = eyeIcon.parentElement.parentElement.querySelectorAll(".password");
  
  pwFields.forEach(password => {
      if(password.type === "password"){
          password.type = "text";
          eyeIcon.classList.replace("bx-hide", "bx-show");
          return;
      }
      password.type = "password";
      eyeIcon.classList.replace("bx-show", "bx-hide");
  })
  
})
})      

links.forEach(link => {
link.addEventListener("click", e => {
 e.preventDefault(); 
 forms.classList.toggle("show-signup");
})
})

    


signUpForm.addEventListener('submit', async (e) => {
  e.preventDefault(); 
  console.log(e);

  messagePreview.textContent = '';

  const emailInput = e.target.email;
  const passwordInput = e.target.password;
  const passwordconfirm = e.target.password2;

  try {
    const user = new Authentication(
      emailInput.value.trim(),
      passwordInput.value.trim()
    );
    user.verifyData();
    const res = await user.signup();
    console.log(res);
    if (res.statusCode === 409) {
      messagePreview.textContent = res.message;
      messagePreview.style.color = 'crimson';
    }

    if (res.statusCode === 201) {
      console.log(res);

      LocalStorageData.setData(res.data);
      window.location.replace('../index.html');
    }
  } catch (error) {
    if (error.message === 'passwordError') {
      messagePreview.textContent =
        'Your password must be more than 5 characters';
      messagePreview.style.color = 'crimson';
    }

    if (error.message === 'emailError') {
      messagePreview.textContent =
        'Your email is not correct';
      messagePreview.style.color = 'crimson';
    }
  
    if(passwordInput !== passwordconfirm){
      messagePreview.textContent =
        'Passwords do not match!!';
      messagePreview.style.color = 'crimson';
    }
  }
}
);




const signInForm = document.querySelector('form');

signInForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  messagePrevieww.textContent = '';

  const emailInputt = e.target.email1;
  const passwordInputt = e.target.password1;

  try {
    const userr = new Authentication(
      emailInputt.value.trim(),
      passwordInputt.value.trim()
    );

    userr.verifyData();

    const ress = await userr.signin();
    if (ress.statusCode === 404) {
      messagePrevieww.textContent = ress.message;
      messagePrevieww.style.color = 'crimson';
    }

    if (res.statusCode === 200) {
      LocalStorageData.setData(ress.data);
      window.location.replace('../index.html');
    }
  } catch (error) {
    if (error.message === 'passwordError') {
      messagePrevieww.textContent = 'email or password is incorrect';
      messagePrevieww.style.color = 'crimson';
    }
  }
});





   