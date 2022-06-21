/*
    Per una nota App di food delivery, ci viene richiesto di 
    implementare alcune funzionalità per la gestione del carrello.
*/


//prodotti attualmente presenti nel carrello dell'utente
const productsInCart = [{
  id: 324234,
  category: 0,
  quantity: 1,
  title: 'Margherita',
  description: "Pomodoro, mozzarella e basilico",
  ingredients: ['pomodoro', 'mozzarella', 'basilico'],
  price: 6.5
},
{
  id: 098394,
  category: 0,
  quantity: 1,
  title: 'Calzone Classico',
  description: "Ripieno di Pomodoro, mozzarella e prosciutto cotto",
  ingredients: ['pomodoro', 'mozzarella', 'prosciutto cotto'],
  price: 7.0
},
{
  id: 432432,
  category: 4,
  quantity: 1,
  title: 'Coca Cola Zero (33CL)',
  description: "",
  price: 3.0
},
{
  id: 564564,
  category: 0,
  quantity: 1,
  title: 'Salamino',
  description: "Pomodoro, mozzarella e salamino piccante",
  ingredients: ['pomodoro', 'mozzarella', 'salamino'],
  price: 7.5
},
{
  id: 564564,
  category: 0,
  quantity: 1,
  title: 'Salamino',
  description: "Mozzarella, salsiccia, patate al forno",
  ingredients: ['mozzarella', 'salsiccia', 'patate al forno'],
  price: 7.5
},
{
  id: 333445,
  category: 4,
  quantity: 1,
  title: 'Acqua Naturale (1L)',
  description: "",
  price: 2
},
{
  id: 656765,
  category: 3,
  quantity: 3,
  title: 'Cheesecake Cioccolato',
  description: "Dolce a base di formaggio fresco e topping al cioccolato",
  price: 5
},
]

//array statico di oggetti che contiene tutte le categorie presenti nell'app
const categories = [{
  id: 0,
  name: "pizze"
},
{
  id: 1,
  name: "panini"
},
{
  id: 2,
  name: "sushi"
},
{
  id: 3,
  name: "dessert"
},
{
  id: 4,
  name: "bevande"
},
];

//FUNZIONI DA IMPLEMENTARE:

/* 
    ---------------------------------------
    getTotalAmount: restituisce il prezzo finale che l'utente dovrà pagare al checkout
    ---------------------------------------
*/

const getTotalAmount = () => {
  let sum = 0;
  productsInCart.forEach(product => sum += product.price * product.quantity);

  return sum;
}

console.log(getTotalAmount());


/* 
    ---------------------------------------
    getCategoryCode: prende come parametro il nome di una categoria e ne restituisce l'id
    ---------------------------------------
    */

const getCategoryCode = (name) => {
  return categories.find(category => category.name === name)?.id;
}

console.log(getCategoryCode('panini'));
/*
    ---------------------------------------
    getCategoryCount: prende come parametro il nome di una categoria e restituisce il numero di prodotti presenti per questa
    ---------------------------------------
*/
const getCategoryCount = (categoryName) => productsInCart.filter(product => getCategoryCode(categoryName) === product.category).length;

console.log(getCategoryCount('pizze'));

/*
    ---------------------------------------
    removeFromCart: prende l'id di un prodotto e ne rimuove una unità dal carrello. Se quantity diventa 0, rimuove il prodotto dall'array
    ---------------------------------------
*/
const removeFromCart = (productId) => {

  let selectedItem = productsInCart.find(product => productId === product.id);
  selectedItem.quantity -= 1;



  if (selectedItem.quantity <= 0) {
    let productIndex = productsInCart.findIndex(objectProduct => objectProduct.id === selectedItem.id);
    productsInCart.splice(productIndex, 1);
    return productsInCart;
  } else {
    return selectedItem.quantity;
  }
}

console.log(removeFromCart(333445));
console.log(removeFromCart(324234));
/*
    ---------------------------------------
    printCart: stampa su console tutti i prodotti divisi per categoria. 

    formato richiesto:
        *** PIZZA ***
        - 1 x Margherita (Pomodoro, mozzarella e basilico) | 6.5€
        - 1 x Calzone classico (Ripieno di Pomodoro, mozzarella e prosciutto cotto) | 7€

        *** BEVANDE ***
        - 1 x Coca Cola Zero (33CL) | 3€

        *** TOTALE ***
        16.5€
    ---------------------------------------
*/
const printCart = () => {
  let pizze = [];
  let bevande = [];
  let dessert = [];
  let totale = 0;
  productsInCart.map(objectProduct => {
    if (objectProduct.category === 0) {
      pizze.push(objectProduct);
    } else if (objectProduct.category === 4) {
      bevande.push(objectProduct);
    } else {
      dessert.push(objectProduct);
    }
    totale += objectProduct.price;
  });

  console.log('\n');

  console.log("*** PIZZE ***")
  for (i = 0; i < pizze.length; i++) {
    console.log(`${pizze[i].quantity} x ${pizze[i].title}(${pizze[i].ingredients}) | ${pizze[i].price}€`)
  };

  console.log('\n');

  console.log("*** BEVANDE ***")
  for (i = 0; i < bevande.length; i++) {
    console.log(`${bevande[i].quantity} x ${bevande[i].title} | ${bevande[i].price}€`)
  };

  console.log('\n');

  console.log("*** DESSERT ***")
  for (i = 0; i < dessert.length; i++) {
    console.log(`${dessert[i].quantity} x ${dessert[i].title} | ${dessert[i].price}€`)
  };

  console.log('\n');

  console.log("*** TOTALE ***")
  console.log(`${totale}€`)
};

printCart();

/*
    ---------------------------------------
    getPizzeBianche: Restituisce tutte le pizze bianche presenti nel carrello (pizze senza pomodoro)
    ---------------------------------------

*/

const getPizzeBianche = () => {
  const pizze = productsInCart.filter(product => product.ingredients);
  const pizzeBianche = [];
  for (i = 0; i < pizze.length; i++) {

    if (!pizze[i].ingredients.includes("pomodoro"))
      pizzeBianche.push(pizze[i]);

  }
  return pizzeBianche;
}
console.log(getPizzeBianche());