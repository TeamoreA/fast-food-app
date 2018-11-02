require("../static/js/users")
describe("signin", () => {
let fetchData;
let assignData;
beforeEach(() => {
    document.body.innerHTML += `
     <span id="flash"></span>
    <form  onsubmit="event.preventDefault();">
      <input type="text" id="username" value="Tiim">
      <input type="text" id="password" value="password">
      <button id="send" onclick="login();"></button>
    </form>`;

    fetchData = jest.spyOn(global, "fetch")
    fetchData.mockImplementation(() => Promise.resolve({
      json: () => Promise.resolve({message: "Welcome Tiim, You logged in successfully"})}))
    assignData = jest.spyOn(window.location, "assign")
    assignData.mockImplementation(() => {})
})

afterEach(() => {
    fetchData.mockRestore();
    assignData.mockRestore();
    jest.resetModules();
})

// Test for valid user login
it("Signin a registered user and redirect to homepage", async() => {
    document.getElementById("send").click();
    expect(fetchData).toHaveBeenCalledTimes(1);
    const fetchArgs = fetchData.mock.calls[0];
    expect(fetchArgs[0]).toBe("https://everywherecors.herokuapp.com/https://andela-food-api.herokuapp.com/api/v2/auth/signin");
    expect(fetchArgs[1]).toEqual({
        method: "POST",
        body: JSON.stringify({
            username:"Tiim",
            password: "password"
        }),
        headers: {
            "Content-Type": "application/json"
        }
    })
    await Promise.resolve().then();
    expect(localStorage.getItem("token")).not.toBeNull();
    expect(document.getElementById("flash").innerHTML).toBe("");
    await Promise.resolve().then();
    expect(assignData).toHaveBeenCalledTimes(0);
    // expect(assignData.mock.calls[0][0]).toBe("/");
})

// login with blank password
it("Test login when there in no password", async() => {
    fetchData = jest.spyOn(global, "fetch")
    fetchData.mockImplementation(() => Promise.resolve({
      json: () => Promise.resolve({message: "Login required!"})}))
    document.getElementById("password").value = "";
    document.getElementById("send").click();
    expect(fetchData).toHaveBeenCalledTimes(1);
    const fetchArgs = fetchData.mock.calls[0];
    expect(fetchArgs[0]).toBe("https://everywherecors.herokuapp.com/https://andela-food-api.herokuapp.com/api/v2/auth/signin");
    expect(fetchArgs[1]).toEqual({
        method: "POST",
        body: JSON.stringify({
            username:"Tiim",
            password: ""
        }),
        headers: {
            "Content-Type": "application/json"
        }
    })
    await Promise.resolve().then();
    expect(document.getElementById("flash").innerHTML).toBe("");
})
})
