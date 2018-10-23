//function to get users history
const token = localStorage.getItem("token");
var id = localStorage.getItem("userId");
var corsUrl = 'https://cors-anywhere.herokuapp.com/';
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
  </tr>`;
}
})
.catch(error => console.log(error));
