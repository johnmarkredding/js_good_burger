const burgerIndexURL = "http://localhost:3000/burgers";
document.addEventListener("DOMContentLoaded", () => {
  getData(burgerIndexURL, createBurgers);


  document.getElementById("burger-menu").addEventListener("click", getBurgerDivFromEvent);
  document.querySelector("#custom-burger").addEventListener("submit", newBurger);
});

function newBurger(e) {
  e.preventDefault();
  let burger = {
    name: e.target.querySelector("#burger-name").value,
    description: e.target.querySelector("#burger-description").value,
    image: e.target.querySelector("#burger-image").value
  };

  postData(burgerIndexURL, burger, createBurgerFromDB);

  e.target.querySelector("#burger-name").value = "";
  e.target.querySelector("#burger-description").value = "";
  e.target.querySelector("#burger-image").value = "";
}

function createBurgerFromDB(burger) {
  let menu = document.getElementById("burger-menu");
  let burgerDiv = createBurgerDivFromObj(burger);
  menu.prepend(burgerDiv);
  addToOrder(burgerDiv);
}

function createBurgers(burgerArray) {
  let menu = document.getElementById("burger-menu");
  burgerArray.forEach(function (burger) {
    menu.prepend(createBurgerDivFromObj(burger));
  });
}

function createBurgerDivFromObj(burger) {
  let burgerDiv = document.createElement("div");
  burgerDiv.className = "burger";
  burgerDiv.dataset.id = burger.id;
  burgerDiv.innerHTML = `<h3 class="burger_title">${burger.name}</h3>
  <img src="${burger.image}">
  <p class="burger_description">
  ${burger.description}
  </p>
  <button class="burger-button button">Add to Order</button>
  </div>`
  return burgerDiv;
}

function getBurgerDivFromEvent(e) {
  if (e.target.classList.contains("burger-button")) {
    addToOrder(e.target.parentNode);
  }
}

function postData(url, data, cb) {
  fetch(url, {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'},
    body: JSON.stringify(data)
  })
    .then(res => res.json())
    .then(json => cb(json));
}

function getData(url, cb) {
  fetch(url)
    .then(res => res.json())
    .then(json => cb(json));
}

function addToOrder(burgerDiv) {
  let orderList = document.querySelector("#order-list");
  let burgerTitle = burgerDiv.querySelector(".burger_title").innerText;
  let burgerLI = document.createElement("li");
  burgerLI.innerText = burgerTitle;
  burgerLI.dataset.id = burgerDiv.dataset.id;
  orderList.prepend(burgerLI);
}
