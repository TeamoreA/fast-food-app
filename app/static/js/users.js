//function to create a new user
register = () => {
  var corsUrl = 'https://cors-anywhere.herokuapp.com/';
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
    let msg = Object.values(data);
    console.log(msg);
    // let msg = data.message;
    if(msg === "New user has been created successfully"){
      document.getElementById('flash').innerHTML = msg;
      setTimeout(() => {document.getElementById("flash").innerHTML = "";}, 4000);
      window.location.href = "{{ url_for('login') }}";
    }
    else{
      document.getElementById('flash').innerHTML = msg;
      setTimeout(() => {document.getElementById("flash").innerHTML = "";}, 5000);
    }
  })
  .catch(error => console.log(error));
}

//User login
login = () => {
  var corsUrl = 'https://cors-anywhere.herokuapp.com/';
  let data = {
    username: document.getElementById("username").value,
    password: document.getElementById("password").value
  };
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
    if(msg === "You logged in successfully"){
      access_token = data.token
      localStorage.setItem('token', access_token);
      document.getElementById('flash').innerHTML = msg;
      setTimeout(() => {document.getElementById("flash").innerHTML = "";}, 4000);
      window.location.href = "{{ url_for('home') }}";
    }
    else{
      document.getElementById('flash').innerHTML = msg;
      setTimeout(() => {document.getElementById("flash").innerHTML = "";}, 5000);
    }
  })
  .catch(error => console.log(error));
}