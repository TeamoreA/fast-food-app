//post menu item
const token = localStorage.getItem("token");
register = () => {
  var corsUrl = 'https://morning-springs-84037.herokuapp.com/';
  let data = {
    name: document.getElementById("name").value,
    email: document.getElementById("description").value,
    password: document.getElementById("price").value
  };
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
      document.getElementById('flash').innerHTML = msg;
      setTimeout(() => {document.getElementById("flash").innerHTML = "";}, 4000);
      window.location.href = "/menu";
    }
    else{
      document.getElementById('flash').innerHTML = msg;
      setTimeout(() => {document.getElementById("flash").innerHTML = "";}, 5000);
    }
  })
  .catch(error => console.log(error));
}

// display menu items
var corsUrl = 'https://morning-springs-84037.herokuapp.com/'
const url = "https://andela-food-api.herokuapp.com/api/v2/menu";
fetch(corsUrl + url)
.then(function(response){
  return response.json()
})
.then(function(data){
  let items = data.menu
  document.getElementById('food_menu').innerHTML = items.length;
  for(i = 0; i < items.length; i++){
    document.getElementById('menu').innerHTML += `
    <tr>
      <td>${items[i].meal_id}</td>
      <td>${items[i].meal_name}</td>
      <td>$ ${items[i].unit_price}</td>
      <td>
        <a class="button-small button-success" href="edit.html">Edit</a>
        <button class="button-small button-danger" href="#" onclick="confirmDelete()">Delete</button>
      </td>
    </tr>`;
  }

})
.catch(error => console.log(error));