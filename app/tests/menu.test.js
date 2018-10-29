require('../static/js/menu');
describe('menu',()=>{
let fetchData;
beforeEach(()=>{
    document.body.innerHTML +=`
    <table id="food_menu">
        <tr>
            <th>#</th>
            <th>Order Name</th>
            <th>Price</th>
            <th>Description</th>
        </tr>
    </table>
    `
    fetchData = jest.spyOn(global, 'fetch')
    fetchData.mockImplementation(()=>Promise.resolve({
      json: ()=>Promise.resolve({message: ""})}))
})
//Tear Down
afterEach(()=>{
    fetchData.mockRestore();
    jest.resetModules();
})

//Test user can view availlable menu options
it('view menu items', async() => {
    expect(fetchData).toHaveBeenCalledTimes(1);
    const fetchArgs = fetchData.mock.calls[0];
    expect(fetchArgs[0]).toBe("https://everywherecors.herokuapp.com/https://andela-food-api.herokuapp.com/api/v2/menu");
    await Promise.resolve().then();
    // expect(document.getElementById("food_menu").innerHTML).toBe(null);
})
})