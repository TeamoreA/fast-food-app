// display all orders to the admin
const token = localStorage.getItem("token");
var corsUrl = 'https://cors-anywhere.herokuapp.com/';
const url = "https://andela-food-api.herokuapp.com/api/v2/orders/4";
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
  let items = data.Orders;
  console.log(items);
  for(i = 0; i < items.length; i++){
    document.getElementById('all_orders').innerHTML += `
    <tr>
      <td>${items[i].id}</td>
      <td>${items[i].name}</td>
      <td>${items[i].ordered_by}</td>
      <td>${items[i].address}</td>
      <td>${items[i].quantity}</td>
      <td>${items[i].status}</td>
      <td>
        <a class="button-small button-success" href="edit.html">Edit</a>
        <button class="button-small button-danger" onclick="confirmDelete()">Delete</button>
      </td>
    </tr>`;
  }


})
.catch(error => console.log(error));