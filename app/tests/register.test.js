require('../static/js/users')
describe('register',()=>{
let fetchData;
let assignData;
beforeEach(()=>{
    document.body.innerHTML += `
    <span id="flash"></span>
    <form onsubmit="event.preventDefault();">
        <input type="text" value="Tiim" id="name">
        <input type="email" value="tiim@app.com" id="email">
        <input type="password" value="password" id="password">
        <input type="password" value="password"  id="confirm_password">
        <button id="send" onclick="register()"></button>
    </form>`;

    fetchData = jest.spyOn(global, 'fetch')
    fetchData.mockImplementation(()=>Promise.resolve({
      json: ()=>Promise.resolve({message: "New user has been created successfully"})}))
    assignData = jest.spyOn(window.location, 'assign')
    assignData.mockImplementation(()=>{})
})
//Tear Down
afterEach(()=>{
    fetchData.mockRestore();
    assignData.mockRestore();
    jest.resetModules();
})

//Test for user redirection after register
it('New user is redirected to homepage after signup.', async() => {
    document.getElementById('send').click();
    expect(fetchData).toHaveBeenCalledTimes(1);
    const fetchArgs = fetchData.mock.calls[0];
    expect(fetchArgs[0]).toBe("https://everywherecors.herokuapp.com/https://andela-food-api.herokuapp.com/api/v2/auth/signup");
    expect(fetchArgs[1]).toEqual({
            method: "POST",
            body: JSON.stringify({
                username: "Tiim",
                email: "tiim@app.com",
                password: "password",
                confirm_password: "password"
            }),
            headers: {
                "Content-Type": "application/json"
              }
    });
    await Promise.resolve().then();

    expect(assignData).toHaveBeenCalledTimes(1);
    expect(assignData.mock.calls[0][0]).toBe('/login');
    expect(document.getElementById('flash').innerHTML).toBe("New user has been created successfully");
})

//Test user regsiteration with invalid email address
// it("wrong email address", async() => {
//     fetchData = jest.spyOn(global, 'fetch')
//     fetchData.mockImplementation(()=>Promise.resolve({
//     json: ()=>Promise.resolve({Message: "Your email address is invalid!"})}))
//     document.getElementById('email').value = "tiim@app.com";
//     document.getElementById('send').click();
//     expect(fetchData).toHaveBeenCalledTimes(1);
//     const fetchArgs = fetchData.mock.calls[0];
//     expect(fetchArgs[0]).toBe("https://everywherecors.herokuapp.com/https://andela-food-api.herokuapp.com/api/v2/auth/signup");
//     expect(fetchArgs[1]).toEqual({
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify({
//             username: "Tiim",
//             email: "tiim@app.com",
//             password: "password",
//             confirm_password: "password"
//         })
//     });

    // await Promise.resolve().then();
    // expect(document.getElementById('flash').innerHTML).toBe("Password do not match");
// })
//Test user regsiteration for registered users
it("test for duplicate user name", async() => {
    fetchMock = jest.spyOn(global, 'fetch')
    fetchMock.mockImplementation(()=>Promise.resolve({
      json: ()=>Promise.resolve({message: "username already taken"})}))
    document.getElementById('send').click();
    expect(fetchMock).toHaveBeenCalledTimes(1);
    const fetchArgs = fetchMock.mock.calls[0];
    expect(fetchArgs[0]).toBe("https://everywherecors.herokuapp.com/https://andela-food-api.herokuapp.com/api/v2/auth/signup");
    await Promise.resolve().then();
    expect(document.getElementById('flash').innerHTML).toBe("username already taken");
})

})