//post menu item
createMenu = () => {
  const token = localStorage.getItem("token");
  var corsUrl = 'https://everywherecors.herokuapp.com/';
  var url = 'https://andela-food-api.herokuapp.com/api/v2/menu';
  let data = {
    name: document.getElementById("name").value,
    description: document.getElementById("description").value,
    price: document.getElementById("price").value,
    image: document.getElementById("image").value

  };
  
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
    console.log(msg);
    if(msg === "Food item created successfully"){
      document.getElementById('flash-success').style.display = "block";
      document.getElementById('flash-success').innerHTML = msg;
      setTimeout(() => {document.getElementById("flash-success").innerHTML = "";}, 8000);
      window.location.href = "/admin/admin_index";
    }
    else{
      alert(msg);
      // document.getElementById('flash').style.display = "block";
      // document.getElementById('flash').innerHTML = msg;
      // setTimeout(() => {document.getElementById("flash").innerHTML = "";}, 8000);
    }
  })
  .catch(error => console.log(error));
}

// display menu items
var corsUrl = 'https://everywherecors.herokuapp.com/';
var url = "https://andela-food-api.herokuapp.com/api/v2/menu";
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
      <td>
      <button onclick=(populateMenu("${items[i].id}","${items[i].price}","${items[i].image}")) class="button-small button-primary"><i class="fas fa-pencil-alt"></i></button>
    </td>
    </tr>`;
    
  }
})
.catch(error => console.log(error));

populateMenu = (id, price, image) => {
  document.getElementById('update-tab').style.display = 'block';
  document.getElementById('display-tab').style.display = 'none';
  localStorage.removeItem('menu_id');
  localStorage.setItem('menu_id', id);
  // document.getElementById('my-name').innerHTML = `<input class="form-control" type="text" value="${name}" id="name" required>`;
  document.getElementById('my-price').innerHTML = `<input class="form-control" type="number"  min="1" value="${price}" id="price" required>`;
  document.getElementById('my-image').innerHTML = `<input class="form-control" type="text" value="${image}" id="image" required>`;
  // document.getElementById('my-description').innerHTML = `<textarea class="form-control" rows="5" id="description" required>${description}</textarea>`;
}

//update menu item
updateMenu = () => {
  const token = localStorage.getItem("token");
  let id = localStorage.getItem("menu_id")
  console.log(id);
  var corsUrl = 'https://everywherecors.herokuapp.com/';
  var url = `https://andela-food-api.herokuapp.com/api/v2/menu/${id}`;
  let data = {
    name: document.getElementById("name").value,
    description: document.getElementById("description").value,
    price: document.getElementById("price").value,
    image: document.getElementById("image").value

  };
  
  fetch(corsUrl  + url, {
    method: 'PUT',
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
    console.log(msg);
    if(msg === "Food item updated successfully"){
      document.getElementById('flash-success').style.display = "block";
      document.getElementById('flash-success').innerHTML = msg;
      setTimeout(() => {document.getElementById("flash-success").innerHTML = "";}, 8000);
      window.location.href = "/admin/admin_index";
    }
    else{
      alert(msg);
      // document.getElementById('flash').style.display = "block";
      // document.getElementById('flash').innerHTML = msg;
      // setTimeout(() => {document.getElementById("flash").innerHTML = "";}, 8000);
    }
  })
  .catch(error => console.log(error));
}