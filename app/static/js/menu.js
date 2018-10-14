//post menu item
const token = localStorage.getItem("token");
createMenu = () => {
  var corsUrl = 'https://cors-anywhere.herokuapp.com/';
  let data = {
    name: document.getElementById("name").value,
    description: document.getElementById("description").value,
    price: document.getElementById("price").value
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
      setTimeout(() => {document.getElementById("flash").innerHTML = "";}, 5000);
      window.location.href = "/api/v2/menu";
    }
    else{
      document.getElementById('flash').innerHTML = msg;
      setTimeout(() => {document.getElementById("flash").innerHTML = "";}, 6000);
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
  // console.log(items);
  // window.location.href = "{{ url_for('login') }}";
  for(i = 0; i < items.length; i++){
    document.getElementById('food_menu').innerHTML += `
    <tr>
      <td>${items[i].id}</td>
      <td>${items[i].name}</td>
      <td>${items[i].price}</td>
      <td>
        <a class="button-small button-success" href="edit.html">Edit</a>
        <button class="button-small button-danger" onclick="confirmDelete()">Delete</button>
      </td>
    </tr>`;
  }
})
.catch(error => console.log(error));