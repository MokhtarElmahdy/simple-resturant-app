// variables
let tabs = document.querySelectorAll(".nav-tab p");
let signinSubmit = document.getElementById("signin-submit");
let signupSubmit = document.getElementById("signup-submit");
let upName = document.getElementById('upName');
let upMail = document.getElementById('upMail');
let upPass = document.getElementById('upPass');
let inMail = document.getElementById('inMail');
let inPass = document.getElementById('inPass');

let upNameErr = document.getElementById("upNameErr")
let upMailErr = document.getElementById("upMailErr")
let upPassErr = document.getElementById("upPassErr")
let inMailErr = document.getElementById("inMailErr")
let inPassErr = document.getElementById("inPassErr")


let users ;
let emailMatch = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
// default values
document.querySelector(".signin").style.display = "block";
document.querySelector(".signup").style.display = "none";
// check Local Storage

if (localStorage.getItem('users')){
  users = JSON.parse(localStorage.getItem('users'));
}else{
  users = []
}




// Switch tabs

for (let i = 0; i < tabs.length; i++) {
  tabs[i].onclick = function () {
    for (let j = 0; j < tabs.length; j++) {
      tabs[j].classList.remove("active");
    }
    this.classList.add("active");
    if (this.innerText == "Sign in") {
      document.querySelector(".signin").style.display = "block";
      document.querySelector(".signup").style.display = "none";
    } else if (this.innerText == "Sign up") {
      document.querySelector(".signin").style.display = "none";
      document.querySelector(".signup").style.display = "block";
    }
  };
}

signinSubmit.addEventListener("click", (e) => {
  e.preventDefault();
  let flag = false;
  let inMailFlag = true,inPassFlag = true
  for(let i = 0;i<users.length;i++){
    if((users[i].email === inMail.value)){
      inMailFlag = false;
      if(users[i].password === inPass.value){
        inPassFlag = false
      }
    }
  }
if(inMailFlag){
  inMailErr.innerText = "Email Not Found";
}else{
  inMailErr.innerText = "";
  if(inPassFlag){
    inPassErr.innerText = "Password Not Correct";
  }else{
    inPassErr.innerText = "";

  }
}


  for(let i = 0;i<users.length;i++){
    if((users[i].email === inMail.value) && (users[i].password === inPass.value)){
      flag = true;
      if(flag){
        localStorage.setItem('username',users[i].username)
        window.location.href = "Home.html";
      }
    }
  }

  // window.location.href = "Home.html";
});
signupSubmit.addEventListener("click", (e) => {
  let upNameFlag = true,upMailFlag = true,upPassFlag = true
let userData = {
  username: upName.value,
  email: upMail.value,
  password: upPass.value,
}
if(userData.username.length == 0){
  upNameErr.innerText = "Field Required";
  upNameFlag = false;
}else{
  upNameErr.innerText = "";

}
if(userData.email.length == 0){
  upMailErr.innerText = "Field Required";
  upMailFlag = false;
}else if(!userData.email.match(emailMatch)){
  upMailErr.innerText = "Email isn't correct";
  upMailFlag = false;
}else{
  upMailErr.innerText = "";

}
if(userData.password.length == 0){
  upPassErr.innerText = "Field Required";
  upPassFlag = false;
}else if(userData.password.length < 8){
  upPassErr.innerText = "Password must be more than 8 characters";
  upPassFlag = false;
}else{
  upPassErr.innerText = "";
}

for(let k=0;k<users.length;k++){
  if(userData.username == users[k].username){
    upNameErr.innerText = "Username already existed";
    upNameFlag = false;
  }
}
for(let k=0;k<users.length;k++){
  if(userData.email == users[k].email){
    upMailErr.innerText = "Email already existed";
    upMailFlag = false;
  }
}

if(upNameFlag && upMailFlag && upPassFlag ){
  users.push(userData)
  localStorage.setItem('users',JSON.stringify(users))
  localStorage.setItem('username',userData.username)
  window.location.href = "Home.html";  
}

e.preventDefault();

});




// document.body.appendChild(`<p>Hello World</p>`)