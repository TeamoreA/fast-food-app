require('../static/js/menu');
describe('createFood',()=>{
let fetchData;
beforeEach(()=>{
    document.body.innerHTML +=`
    <form onsubmit="event.preventDefault();">
        <input type="text" id="name" value="Cool beer">
        <input type="text" id="image" value="coolbeer.jpg">
        <input type="text" id="description" value="cool and served to you.">
        <input type="number" id="price" value="4">
        <button  id="send" onclick="createMenu();">Submit</button>
        <span id="flash"></span>
    </form>`
    fetchData = jest.spyOn(global, 'fetch')
    fetchData.mockImplementation(()=>Promise.resolve({
      json: ()=>Promise.resolve({message: "Food item created successfully"})}))
})
//Tear Down
afterEach(()=>{
    fetchData.mockRestore();
    jest.resetModules();
})

//Admin user should be able to add food items
it('Add menu option', async() => {
    document.getElementById('send').click();
    expect(fetchData).toHaveBeenCalledTimes(2);
    const fetchArgs = fetchData.mock.calls[0];
    expect(fetchArgs[0]).toBe("https://everywherecors.herokuapp.com/https://andela-food-api.herokuapp.com/api/v2/menu");
    // expect(fetchArgs[1]).toEqual({
    //     method: 'POST',
    //     body: JSON.stringify({
    //         name: "Cool beer",
    //         image: "coolbeer.jpg",
    //         description: "cool and served to you.",
    //         price: "4"
    //     }),
    //     headers: {
    //         'Content-Type': 'application/json'
    //     }
    // })
    await Promise.resolve().then();
    expect(document.getElementById("flash").innerHTML).toBe("Food item created successfully");
})
})