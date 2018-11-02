//function to create a new user
register = () => {
  var corsUrl = 'https://everywherecors.herokuapp.com/';
  let data = {
    username: document.getElementById("name").value,
    email: document.getElementById("email").value,
    password: document.getElementById("password").value,
    confirm_password: document.getElementById("confirm_password").value
  };
  const url = 'https://andela-food-api.herokuapp.com/api/v2/auth/signup';
  fetch(corsUrl  + url, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json"
    }
  })
  .then(function(response){
    return response.json()
  })
  .then(function(data){
    let message = data.message;
    // let message = Object.values(data);
    console.log(message);
    // let message = data.message;
    if(message === "New user has been created successfully"){
      document.getElementById('flash-success').style.display = "block";
      document.getElementById('flash-success').innerHTML = message;
      setTimeout(() => {document.getElementById("flash-success").innerHTML = "";}, 4000);
      window.location.assign("/login");
    }
    else{
      // alert(message);
      document.getElementById('flash-danger').style.display = "block";
      document.getElementById('flash-danger').innerHTML = message;
      setTimeout(() => {document.getElementById("flash-danger").innerHTML = "";}, 5000);
    }
  })
  .catch(error => console.log(error));
}

//User login
login = () => {
  var corsUrl = 'https://everywherecors.herokuapp.com/';
  let data = {
    username: document.getElementById("username").value,
    password: document.getElementById("password").value
  };
  username = data.username
  localStorage.setItem('currentUser', username);
  const url = 'https://andela-food-api.herokuapp.com/api/v2/auth/signin';
  fetch(corsUrl  + url, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json"
    }
  })
  .then(function(response){
    return response.json();
  })
  .then(function(data){
    let msg = data.message;
    if(msg === 'Welcome ' + username + ', You logged in successfully'){
      access_token = data.token
      localStorage.setItem('token', access_token);
      document.getElementById('flash-success').style.display = "block";
      document.getElementById('flash-success').innerHTML = msg;
      setTimeout(() => {document.getElementById("flash-success").innerHTML = "";}, 6000);
      window.location.assign("/");
    }
    else{
      // alert(msg);
      document.getElementById('flash-danger').style.display = "block";
      document.getElementById('flash-danger').innerHTML = msg;
      setTimeout(() => {document.getElementById("flash-danger").innerHTML = "";}, 6000);
    }
  })
  .catch(error => console.log(error));
}

