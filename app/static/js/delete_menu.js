//function to delete an order
deleteMenu = () => {
  const token = localStorage.getItem("token");
  var corsUrl = 'https://everywherecors.herokuapp.com/';
  id = document.getElementById('menu_id').value;
  var url = `https://andela-food-api.herokuapp.com/api/v2/menu/${id}`;
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
    if(msg === "Menu item deleted successfully"){
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