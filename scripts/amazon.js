import {updateCartQuantity,calculateCartQuantity, addToCart, cart} from "../data/cart.js";
import {products} from "../data/products.js";
import {formatCurrency} from "./utils/money.js";

/* 
Main idea of Javascript
1)Save the data(information)
2)Generate the HTML
3)Make it Interactive
*/
// let cart = []; naming conflict occured(Use Module JS feature)

/*1)Save the data(information)*/
// Take data from seperate product.js file
// const products = [{
//   image: '/images/products/athletic-cotton-socks-6-pairs.jpg',
//   name:'Black and Gray Athletic Cotton Socks - 6 Pairs',
//   ratings:{
//     stars:'/images/ratings/rating-45.png',
//     count:87 
//   },
//   priceINR: 10.90
// },{
//   image:'/images/products/intermediate-composite-basketball.jpg',
//   name:'Intermediate Size Basketball',
//   ratings:{
//     stars:'/images/ratings/rating-40.png',
//     count:127
//   },
//   priceINR: 20.95
// }];


/*2)Generate the HTML*/
let productsHTML = '';   /// Accumulator Variable

products.forEach((product)=>{
 const html = `
 <div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${product.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="images/ratings/rating-${product.rating.stars * 10}.png">
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
          ₹ ${formatCurrency(product.priceCents)}
          </div>

          <div class="product-quantity-container">
            <select class="js-quantity-selector-${product.id}">
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart js-added-to-cart-inc-opacty-${product.id}">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary js-add-to-cart-btn"
          data-product-id='${product.id}'>
            Add to Cart
          </button>
        </div>
 
 `;
 productsHTML = productsHTML + html;
//  console.log(result);
document.querySelector('.js-product-cont-grid').innerHTML = productsHTML;
});


/*3)Make it Interactive*/
/*
For cart we need 2 things product and quantity so 
we use array of objects like 
const cart = [{
  product: 'produt1',
  quantuty: 1 ,
},{
  product: 'product2',
  quantity: 3,
}];
Let's create a seperate file for cart to make our code cleaner data/cart.js file, so that each file focus on one particular thing.
*/

// function updateHeaderCartQuantity(){
//   let cartQuantity = 0;
//   cart.forEach(( cartItem)=>{
//     cartQuantity +=cartItem.quantity;
//   });
//   document.querySelector('.js-cart-quantity')
//   .innerHTML = cartQuantity;

// }

calculateCartQuantity('.js-cart-quantity');


document.querySelectorAll('.js-add-to-cart-btn')
.forEach((button)=>{
button.addEventListener('click', ()=>{
    /*It is not good to use productName, rather use productId*/
//  console.log(button.dataset.productName);
//  const productId = button.dataset.productId;
const {productId} = button.dataset; // object destructuring 
// console.log(button.dataset)
  addToCart(productId);  //Organize our code in separate function or seperate related files
  updateCartQuantity(productId);
});
});
