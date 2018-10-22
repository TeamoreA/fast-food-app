function myFunction() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
}

if (localStorage.getItem('token') === null) {
  document.getElementById('logout').style.display = "none";
}
function logout() {
    // var x = document.getElementById("logout");
	localStorage.removeItem('token');
	var msg = "You logged out successfully";
	document.getElementById('flash').style.display = "block";
	document.getElementById('flash').innerHTML = msg;
	setTimeout(() => {document.getElementById("flash").innerHTML = "";}, 60000);
	// window.location.href = "/";
}


