var user_input = document.getElementById("username");
var pass_input = document.getElementById("password");
var pass_confirm_input = document.getElementById("password_confirm");

var r_user = document.getElementById("r_user");
var r_pass = document.getElementById("r_pass");
var pass_check = document.getElementById("pass_check");
var caps = document.getElementById("caps");

const r_user_text = r_user.innerText;
const r_pass_text = r_pass.innerText;
const pass_check_text = pass_check.innerText;

r_user.innerText = "❌" + r_user_text;
r_pass.innerText = "❌" + r_pass_text;
pass_check.innerText = "❌" + pass_check_text;

function check_username(user){
    if(users.includes(user)){
        return "❌Username already exists";
    }

    if(user.length < 4){
        return "❌Username has at least 4 characters";
    }
    return "✅Username has at least 4 characters";
}

function check_password(pass){
    if(pass.length < 4){
        return "❌Password has at least 4 characters";
    }
    return "✅Password has at least 4 characters";
}

function confirm_pass(pass1, pass2){
    if(pass1.length == 0 || pass2.length == 0){
        return "❌Passwords are empty";
    }
    if(pass1 != pass2){
        return "❌Passwords match";
    }
    return "✅Passwords match";
}

user_input.addEventListener("input", (e) => {
    r_user.innerText = check_username(user_input.value);
    r_pass.innerText = check_password(pass_input.value);
    pass_check.innerText = confirm_pass(pass_confirm_input.value, pass_input.value);
})

pass_input.addEventListener("input", (e) => {
    r_user.innerText = check_username(user_input.value);
    r_pass.innerText = check_password(pass_input.value);
    pass_check.innerText = confirm_pass(pass_confirm_input.value, pass_input.value);
})

pass_confirm_input.addEventListener("input", (e) => {
    r_user.innerText = check_username(user_input.value);
    r_pass.innerText = check_password(pass_input.value);
    pass_check.innerText = confirm_pass(pass_confirm_input.value, pass_input.value);
})

document.addEventListener('keyup', (e) => {
    if (e.getModifierState('CapsLock')) {
        caps.style.display = "block";
    } else {
        caps.style.display = "none";
    }
});