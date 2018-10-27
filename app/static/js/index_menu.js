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
  for(index = 0; index < items.length; index++){
    document.getElementById("food_menu").innerHTML += `
    <div class="card">
    <img src="${items[index].image}" width='198px' height='150px' alt='food image not available'>
      <div class="myContainer">
        <h4><b>${items[index].name}</b></h4> 
        <p>${items[index].description}</p> 
        <p> <strong>price:</strong> <em>${items[index].price}</em></p>
     </div>
      <a class="btn button-success" ><i class="fas fa-plus"></i>  Order</a>
    </div>
    `;
  }
})
.catch(error => console.log(error));