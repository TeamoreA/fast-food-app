// display all orders to the admin
const token = localStorage.getItem("token");
var corsUrl = 'https://cors-anywhere.herokuapp.com/';
const url = "https://andela-food-api.herokuapp.com/api/v2/users/orders/1";
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
  console.log(items);
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
        <a class="button-small button-success" href="edit.html">Accept</a>
        <button class="button-small button-danger" onclick="confirmDelete()">Decline</button>
      </td>
    </tr>`;
  }


})
.catch(error => console.log(error));