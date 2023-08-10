const pizzas = [
  {
    id: 1,
    nombre: "pizza de Muzzarella",
    precio: 500,
    ingredientes: ["Muzzarella", "Tomate", "Aceitunas"],
    image: "./assets/pizzamuzzarella.avif",
  },

  {
    id: 2,
    nombre: "pizza de Cebolla",
    precio: 1500,
    ingredientes: ["Muzzarella", "Tomate", "Cebolla"],
    image: "./assets/pizzacebolla.avif",
  },

  {
    id: 3,
    nombre: "pizza Napolitana",
    precio: 1350,
    ingredientes: ["Muzzarella", "Tomate", "Aceitunas", "Anchoas"],
    image: "./assets/pizzanapolitana.avif",
  },

  {
    id: 4,
    nombre: "pizza 4 Quesos",
    precio: 1380,
    ingredientes: [
      "Muzzarella",
      "Tomate",
      "Queso Azul",
      "Parmesano",
      "Roquefort",
    ],
    image: "./assets/pizza4quesos.avif",
  },

  {
    id: 5,
    nombre: "pizza Especial",
    precio: 1000,
    ingredientes: ["Muzzarella", "Tomate", "Aceitunas", "Jamón", "Cebolla"],
    image: "./assets/pizzaespecial.avif",
  },

  {
    id: 6,
    nombre: "pizza con Anana",
    precio: 600,
    ingredientes: ["Muzzarella", "Tomate", "Anana"],
    image: "./assets/pizzaanana.avif",
  },
];

const formContainer = document.getElementById("form-container")
const numberInput = document.getElementById("numberInput")
const resultContainer = document.getElementById("resultContainer")
const submitButton = document.getElementById("submitButton")

const pizzeriaItems = JSON.parse(localStorage.getItem("pizzeriaItems")) || [];

// Guardar usuarios

const saveToLocalStorage = (last) =>{
  localStorage.setItem("pizzeriaItems", JSON.stringify(last))
};

const findPizzaById = (id) =>{
  return pizzas.find((pizza) => pizza.id == id);
};

/* function showPizza (pizzas) {
  resultContainer.innerHTML = '';
  pizzas.forEach(pizza => {
    resultContainer.innerHTML +=
      `<div class="card">
        <h2>${pizza.nombre}</h2>
        <img src="${pizza.image}" alt="">
        <p>Precio: ${pizza.precio} ARS</p>
      </div>`;
  })
} */

/* function findAndShowPizzasById(id){
  const pizzaFound = pizzas.find(pizza => pizza.id === id);
  if (pizzaFound){
    showPizza([pizzaFound])
  }
} */
 // No logre que busque por id, solo en ultima pizza buscada 
const findAndShowPizzasById = (id) =>{

  if (pizzas.id){
    resultContainer.innerHTML = 
    `
    <div class="card">
    <p> última pizza buscada <p>
    <img src= "${pizzeriaItems.image}" class = "card-img">
    <div> 
    <h2> ${pizzeriaItems.nombre} <h2>
    <p> $${pizzeriaItems.precio} <p>
    <div>
    <div>
    `
  }
};

const recuperarPizza = (pizzeriaItems) =>{
  if (pizzeriaItems.id){
    resultContainer.innerHTML = 
    `
    <div class="card">
    <p> última pizza buscada <p>
    <img src= "${pizzeriaItems.image}" class = "card-img">
    <div> 
    <h2> ${pizzeriaItems.nombre} <h2>
    <p> $${pizzeriaItems.precio} <p>
    <div>
    <div>
    `
  }
};


const errorMessage = (message) =>{
  return (resultContainer.innerHTML =
  ` 
  <p class = "error-message"> error <p>
  <p class = "error-message"> ${message} <p>
  `
)}

const saveLastPizza = (idUser) =>{
  localStorage.setItem("lastPizza", JSON.stringify(idUser))
}
  submitButton.addEventListener("click", () =>{
  const pizzaId = parseInt(numberInput.value);
  findAndShowPizzasById(pizzaId)
});

const verification = (input) =>{
  return !input.value
};

const checkInput = (input) =>{
  let valid = false;
  if (verification(input)) {
    errorMessage(
      "Ingrese un ID numérico."
    );
    return;

  }
  valid = true;
  return valid;
};

const ejecutar = (e) =>{
  e.preventDefault();

  let isValidInput = checkInput(numberInput);

  if(isValidInput){
    const idUser = numberInput.value;
    let pizzaFound = findPizzaById(idUser);

    if (pizzaFound) {
      pizzeriaItems.push(pizzaFound);
      recuperarPizza(pizzeriaItems[pizzeriaItems.length - 1]);
      
      /* findAndShowPizzasById(pizzaFound); */
      findAndShowPizzasById(pizzas)
      saveToLocalStorage(pizzeriaItems);
    } else{
      errorMessage("No se encontró el ID");
    }
  }}

const init =  () =>{
  document.addEventListener("DOMContentLoaded", init);
  formContainer.addEventListener("submit", ejecutar);
};
init();