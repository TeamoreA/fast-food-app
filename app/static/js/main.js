const activeUser = localStorage.getItem("currentUser");
var corsUrl = 'https://cors-anywhere.herokuapp.com/';
const URI = "https://andela-food-api.herokuapp.com/api/v2/auth/signup";
fetch(corsUrl  + URI, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json"
    }
  })
.then(function(response){
  return response.json()
})
.then(function(data){
  let users = data['Users'];
  for(i = 0; i < users.length; i++){
      if (users[i].name === activeUser) {
      	localStorage.setItem('isAdmin', users[i].admin);
      	localStorage.setItem('userId', users[i].id);
	  }
  }

})

function myFunction() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
}


function logout() {
	localStorage.removeItem('token');
	localStorage.removeItem('isAdmin');
	localStorage.removeItem('userId');
	var msg = "You logged out successfully";
	document.getElementById('flash').style.display = "block";
	document.getElementById('flash').innerHTML = msg;
	setTimeout(() => {document.getElementById("flash").innerHTML = "";}, 60000);
	// window.location.href = "/";
}

if (localStorage.getItem('token') === null) {
  document.getElementById('logout').style.display = "none";
} else {
	document.getElementById('login').style.display = "none";
	document.getElementById('register').style.display = "none";
}
isAdmin = localStorage.getItem('isAdmin');
if (isAdmin !== 'true') {
	document.getElementById('orders').style.display = "none";
	document.getElementById('menu').style.display = "none";
}

