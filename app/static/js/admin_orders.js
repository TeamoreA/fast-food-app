//function to create a new user
const token = localStorage.getItem("token");
orderProcess = () => {
  var corsUrl = 'https://everywherecors.herokuapp.com/';
  let data = {
    status: document.getElementById("status").value
  };
  // id = data.order_id
  id = document.getElementById('order_id').value;
  console.log(status);
  var url = `https://andela-food-api.herokuapp.com/api/v2/orders/${id}`;
   // console.log(url);
  // const url = `https://andela-food-api.herokuapp.com/api/v2/orders/${id}`;
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
    // console.log(msg);
    let msg = data.message;
    if(msg === "Order Status updated successfully"){
      document.getElementById('flash').style.display = "block";
      document.getElementById('flash').innerHTML = msg;
      setTimeout(() => {document.getElementById("flash").innerHTML = "";}, 4000);
      window.location.href = "/admin/orders_list";
    }
    else{
      document.getElementById('flash').style.display = "block";
      document.getElementById('flash').innerHTML = msg;
      setTimeout(() => {document.getElementById("flash").innerHTML = "";}, 5000);
    }
  })
  .catch(error => console.log(error));
}


// display all orders to the admin
// const token = localStorage.getItem("token");
var corsUrl = 'https://everywherecors.herokuapp.com/';
const url = "https://andela-food-api.herokuapp.com/api/v2/orders";
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
  let items = data['Orders'];
  for(i = 0; i < items.length; i++){
    document.getElementById('all_orders').innerHTML += `
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