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
  for(index = 0; index < items.length; index++){
    document.getElementById("food_menu").innerHTML += `
    <div class="card">
      <img src="images/food3.jpg" class="image" alt="Avatar" width="195px" height="190" >
      <div class="myContainer">
        <h4><b>${items[index].name}</b></h4> 
        <p>${items[index].description}</p> 
        <p> <strong>price: $</strong> <em>${items[index].price}</em></p> 
        <a class="button-small button-success" >Order</a>
     </div>
    </div>
    `;
  }
})
.catch(error => console.log(error));