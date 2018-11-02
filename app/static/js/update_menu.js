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