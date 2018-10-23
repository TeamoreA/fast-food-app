//post menu item
const token = localStorage.getItem("token");
createMenu = () => {
  var corsUrl = 'https://cors-anywhere.herokuapp.com/';
  let data = {
    name: document.getElementById("name").value,
    price: document.getElementById("price").value,
    description: document.getElementById("description").value

  };
  console.log(token);
  const url = 'https://andela-food-api.herokuapp.com/api/v2/menu';
  fetch(corsUrl  + url, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token
    }
  })
  .then(function(response){
    return response.json();
  })
  .then(function(data){
    let msg = data.message;
    if(msg === "New food item been created successfully"){
      document.getElementById('flash').style.display = "block";
      document.getElementById('flash').innerHTML = msg;
      setTimeout(() => {document.getElementById("flash").innerHTML = "";}, 8000);
      window.location.href = "/admin/admin_index";
    }
    else{
      document.getElementById('flash').style.display = "block";
      document.getElementById('flash').innerHTML = msg;
      setTimeout(() => {document.getElementById("flash").innerHTML = "";}, 8000);
    }
  })
  .catch(error => console.log(error));
}

// display menu items
var corsUrl = 'https://cors-anywhere.herokuapp.com/';
const url = "https://andela-food-api.herokuapp.com/api/v2/menu";
fetch(corsUrl + url)
.then(function(response){
  return response.json()
})
.then(function(data){
  let items = data["menu"];
  for(i = 0; i < items.length; i++){
    document.getElementById('food_menu').innerHTML += `
    <tr>
      <td>${items[i].id}</td>
      <td>${items[i].name}</td>
      <td>${items[i].price}</td>
      <td>${items[i].description}</td>
    </tr>`;
  }
})
.catch(error => console.log(error));