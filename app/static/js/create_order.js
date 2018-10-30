// display menu items
var corsUrl = 'https://everywherecors.herokuapp.com/';
const url = "https://andela-food-api.herokuapp.com/api/v2/menu";
fetch(corsUrl + url)
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


//function to create a new order
const token = localStorage.getItem("token");
createOrder = () => {
  var corsUrl = 'https://everywherecors.herokuapp.com/';
  const url = 'https://andela-food-api.herokuapp.com/api/v2/orders';
  var values = document.getElementById("order_menu");
  let data = {
    name: values.options[values.selectedIndex].value,
    address: document.getElementById("address").value,
    quantity: document.getElementById("quantity").value
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
    return response.json()
  })
  .then(function(data){
    // let msg = Object.values(data);
    let msg = data.message;
    if(msg === "Order created successfully"){
      document.getElementById('flash').style.display = "block";
      document.getElementById('flash').innerHTML = msg;
      setTimeout(() => {document.getElementById("flash").innerHTML = "";}, 4000);
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