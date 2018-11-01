//function to get users history
const token = localStorage.getItem("token");
var id = localStorage.getItem("userId");
var corsUrl = 'https://everywherecors.herokuapp.com/';
var url = `https://andela-food-api.herokuapp.com/api/v2/users/orders/${id}`;
fetch(corsUrl  + url, {
  method: 'GET',
  headers: {
    "Content-Type": "application/json",
    "x-access-token": token
  }
})
.then(function(response){
return response.json()
})
.then(function(data){
let items = data['orders'];
for(i = 0; i < items.length; i++){
  document.getElementById('user_orders').innerHTML += `
  <tr>
    <td>${items[i].id}</td>
    <td>${items[i].name}</td>
    <td>${items[i].ordered_by}</td>
    <td>${items[i].address}</td>
    <td>${items[i].quantity}</td>
    <td>${items[i].status}</td>
    <td>
      <button onclick=(populateOrder("${items[i].quantity}","${items[i].address}")) id="update-order" class="button-small button-primary"><i class="fas fa-pencil-alt"></i></button>
    </td>
  </tr>`;
  localStorage.removeItem('order_id');
  localStorage.setItem('order_id', items[i].id);
}
})
.catch(error => console.log(error));

populateOrder = (quantity,address) => {
  document.getElementById("update-tab").style.display = "block";
  document.getElementById("display-tab").style.display = "none";
  document.getElementById('my-quantity').innerHTML = `<input class="form-control" type="number" min="1" value="${quantity}" id="quantity" required>`;
  document.getElementById('my-address').innerHTML = `<input class="form-control" type="text" id="address" value="${address}" required>`;
}

//function to delete an order
deleteOrder = () => {
  var corsUrl = 'https://everywherecors.herokuapp.com/';
  id = document.getElementById('order_id').value;
  // localStorage.removeItem('order_id');
  // localStorage.setItem('order_id', id);
  var url = `https://andela-food-api.herokuapp.com/api/v2/orders/${id}`;
  fetch(corsUrl  + url, {
    method: 'DELETE',
    headers: {
      "x-access-token": token
    }
  })
  .then(function(response){
    return response.json()
  })
  .then(function(data){
    // console.log(msg);
    let msg = data.message;
    if(msg === "Order deleted successfully"){
      document.getElementById('flash-success').style.display = "block";
      document.getElementById('flash-success').innerHTML = msg;
      setTimeout(() => {document.getElementById("flash-success").innerHTML = "";}, 4000);
    }
    else{
      alert(msg);
      // document.getElementById('flash').style.display = "block";
      // document.getElementById('flash').innerHTML = msg;
      // setTimeout(() => {document.getElementById("flash").innerHTML = "";}, 5000);
    }
  })
  .catch(error => console.log(error));
}

// display menu items
// var corsUrl = 'https://everywherecors.herokuapp.com/';
fetch(corsUrl + "https://andela-food-api.herokuapp.com/api/v2/menu")
.then(function(response){
  return response.json()
})
.then(function(data){
  let items = data["menu"];
  // console.log(items);
  for(i = 0; i < items.length; i++){
    document.getElementById("order_menu").innerHTML += `
    <option value="${items[i].name}" id="name">${items[i].name}</option>
    `;
  }
})
.catch(error => console.log(error));

// update order item
updateOrder = () => {
  let id = localStorage.getItem("order_id")
  var corsUrl = 'https://everywherecors.herokuapp.com/';
  const url = `https://andela-food-api.herokuapp.com/api/v2/users/orders/${id}`;
  var values = document.getElementById("order_menu");
  let data = {
    name: values.options[values.selectedIndex].value,
    address: document.getElementById("address").value,
    quantity: document.getElementById("quantity").value
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
    return response.json()
  })
  .then(function(data){
    // let msg = Object.values(data);
    let msg = data.message;
    if(msg === "Order item updated successfully"){
      document.getElementById('flash-success').style.display = "block";
      document.getElementById('flash-success').innerHTML = msg;
      setTimeout(() => {document.getElementById("flash-success").innerHTML = "";}, 4000);
      window.location.href = "/admin/myorders";
    }
    else{
      alert(msg);
      // document.getElementById('flash').style.display = "block";
      // document.getElementById('flash').innerHTML = msg;
      // setTimeout(() => {document.getElementById("flash").innerHTML = "";}, 5000);
    }
  })
  .catch(error => console.log(error));
}
