//register button
// Get the modal
var modal2 = document.getElementById('id01');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
	if (event.target == modal2) {
		modal2.style.display = "none";
	}
}

//-----------------------------------------------------
// SELECTING ALL TEXT ELEMENTS
var nickName = document.forms['vform']['nickName'];
var email = document.forms['vform']['email'];
var password = document.forms['vform']['password'];
var pswRepeat = document.forms['vform']['pswRepeat'];
// SELECTING ALL ERROR DISPLAY ELEMENTS
var name_error = document.getElementById('name_error');
var emailError = document.getElementById('emailError');
var password_error = document.getElementById('password_error');
// SETTING ALL EVENT LISTENERS
nickName.addEventListener('blur', nameVerify, true);
email.addEventListener('blur', emailVerify, true);
password.addEventListener('blur', passwordVerify, true);

// validation function
function Validate() {
  // validate nickName
  if (nickName.value == "") {
    nickName.style.border = "1px solid red";
    document.getElementById('nickName').style.color = "red";
    name_error.textContent = "尚未填寫";
    nickName.focus();
    return false;
  }
  // validate nickName
  if (nickName.value.length < 3) {
    nickName.style.border = "1px solid red";
    document.getElementById('nickName').style.color = "red";
    name_error.textContent = "NickName must be at least 3 characters";
	nickName.focus();
    return false;
  }
  // validate email
  if (email.value == "") {
    email.style.border = "1px solid red";
    document.getElementById('email_div').style.color = "red";
    emailError.textContent = "尚未填寫";
    email.focus();
    return false;
  }else if(email.value.search(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/) == -1){
	  email.style.border = "1px solid red";
    document.getElementById('email_div').style.color = "white";
    document.getElementById('emailError').style.fontSize = "xx-small";
    emailError.textContent = "請輸入正確的E-mail格式";
    email.focus();
    return false;
  }
  // validate password
  if (password.value == "") {
    password.style.border = "1px solid red";
    document.getElementById('password_div').style.color = "red";
    pswRepeat.style.border = "1px solid red";
    password_error.textContent = "尚未填寫";
    password.focus();
    return false;
  }
  // check if the two passwords match
  if (password.value != pswRepeat.value) {
    password.style.border = "1px solid red";
    document.getElementById('pass_confirm_div').style.color = "white";
    pswRepeat.style.border = "1px solid red";
    password_error.innerHTML = "密碼不相符";
    return false;
  }
}

// event handler functions
function nameVerify() {
	if (nickName.value != "") {
		nickName.style.border = "1px solid #5e6e66";
		document.getElementById('nickname_div').style.color = "#5e6e66";
		name_error.innerHTML = "";
		return true;
	}
  }
function emailVerify() {
	if (email.value != "") {
		email.style.border = "1px solid #5e6e66";
		document.getElementById('email_div').style.color = "#5e6e66";
		emailError.innerHTML = "";
		return true;
	}
}
function passwordVerify() {
	if (password.value != "") {
		password.style.border = "1px solid #5e6e66";
		document.getElementById('pass_confirm_div').style.color = "#5e6e66";
		document.getElementById('password_div').style.color = "#5e6e66";
		password_error.innerHTML = "";
		return true;
	}
	if (password.value === password_confirm.value) {
		password.style.border = "1px solid #5e6e66";
		document.getElementById('pass_confirm_div').style.color = "#5e6e66";
		password_error.innerHTML = "";
		return true;
	}
}

