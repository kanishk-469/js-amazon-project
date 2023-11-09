/* 
Main idea of Javascript
1)Save the data(information)
2)Generate the HTML
3)Make it Interactive
*/

import {
  cart,
  removeFromCart,
  calculateCartQuantity,
  updateQuantity,
  updateDeliveryOption
} from "../../data/cart.js"; // normal export
import { products } from "../../data/products.js"; //normal export
import formatCurrency from "../utils/money.js"; // normal export
import {hello} from "https://unpkg.com/supersimpledev@1.0.1/hello.esm.js"; // Normal export
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js"; // default export
import { deliveryOptions } from "../../data/deliveryOptions.js";
import { renderPaymentSummary } from "./paymentSummary.js";
// renderPaymentSummary

/*Runs external library function without module*/
// hello();
// const today = dayjs();
// const deliveryDate = today.add( 7, 'days');
// console.log(deliveryDate);

/*Runs external library function + module*/
  hello();
  // const today = dayjs();
  // const deliveryDate = today.add(7, "days");
  // console.log(deliveryDate.format('dddd, MMMM D'));


 export function renderOrderSummary(){
let cartSummaryHTML = "";

cart.forEach((cartItem) => {
  const productId = cartItem.productId;

  let matchingProduct = "";

  products.forEach((product) => {
    if (product.id === productId) {
      matchingProduct = product;
    }
  });
   
  const deliveryOptionId = cartItem.deliveryOptionId;

  let deliveryOption;
  deliveryOptions.forEach((option)=>{
    if(option.id === deliveryOptionId){
      deliveryOption = option;
    }
  });

  const today = dayjs();
  const deliveryDate = today.add( deliveryOption.deliveryDays , 'days');
  const dateString = deliveryDate.format('dddd, MMMM D');

  cartSummaryHTML += `
  <div class="cart-item-container 
  js-cart-item-container-${matchingProduct.id}">
    <div class="delivery-date">
      Delivery date: ${dateString}
    </div>

    <div class="cart-item-details-grid">
      <img class="product-image" src="${matchingProduct.image}">

      <div class="cart-item-details">
        <div class="product-name">
        ${matchingProduct.name}
        </div>
        <div class="product-price">
        ₹ ${formatCurrency(matchingProduct.priceCents)}
        </div>
        <div class="product-quantity">
          <span>
            Quantity: <span class="quantity-label js-quantity-label-${
              matchingProduct.id
            }">${cartItem.quantity}</span>
          </span>
          <span class="update-quantity-link link-primary js-update-cart-btn"
          data-product-id=${matchingProduct.id}>
            Update
          </span>

          <input type='text' class="quantity-input js-quantity-input-${
            matchingProduct.id
          }"
          />
          <span class="save-quantity-link link-primary js-save-link"
          data-product-id="${matchingProduct.id}">
          Save
        </span>

          <span class="delete-quantity-link link-primary js-cart-delete"
          data-product-id=${matchingProduct.id}>
            Delete
          </span>
        </div>
      </div>

      <div class="delivery-options">
        <div class="delivery-options-title">
          Choose a delivery option:
        </div>
        ${deliveryOptionHtml(matchingProduct,cartItem)}
        
      </div>
    </div>
  </div>
  `;
});


function deliveryOptionHtml(matchingProduct,cartItem){
let html = '';

deliveryOptions.forEach((deliveryOption) => {
const today = dayjs();
const deliveryDate = today.add( deliveryOption.deliveryDays , 'days');

const dateString = deliveryDate.format('dddd, MMMM D');
const priceString = deliveryOption.priceCents === 0 
? 'FREE' 
: `$${formatCurrency(deliveryOption.priceCents)} - `;

const isChecked = deliveryOption.id === cartItem.deliveryOptionId ? "checked" : '';


 html += `<div class="delivery-option js-delivery-option"
    data-product-id= "${matchingProduct.id}"
    data-delivery-option-id= "${deliveryOption.id}"
    >
  <input type="radio" 
  ${isChecked}
  class="delivery-option-input" name="delivery-option-${
    matchingProduct.id
  }">
  <div>
    <div class="delivery-option-date">
      ${dateString}
    </div>
    <div class="delivery-option-price">
      ${priceString} Shipping
    </div>
  </div>
</div>
  `;
});

return html;

}

// console.log(cartSummaryHTML);
document.querySelector(".js-order-summary").innerHTML = cartSummaryHTML;


const cartDeleteBtn = document.querySelectorAll(".js-cart-delete");
cartDeleteBtn.forEach((deleteLink) => {
  deleteLink.addEventListener("click", () => {
    const productId = deleteLink.dataset.productId;
    removeFromCart(productId);
    //  console.log(cart);
    


    const container = document.querySelector(`
  .js-cart-item-container-${productId}`);
    // console.log(container);
    container.remove(); // we can remove any element from DOM using .remove() method.
    // updateCartQuantity();
    renderPaymentSummary(); // regenerate html (View) after updating data(Model)
    
    calculateCartQuantity(".js-cart-quantity-header", "items");
    
  });
});

const cartUpdateBtn = document.querySelectorAll(".js-update-cart-btn");
cartUpdateBtn.forEach((updateLink) => {
  updateLink.addEventListener("click", () => {
    const productId = updateLink.dataset.productId;
    console.log(productId);

    const container = document.querySelector(`
  .js-cart-item-container-${productId}`);
    container.classList.add("is-editing-quantity");
  });
});

document.querySelectorAll(".js-save-link").forEach((link) => {
  link.addEventListener("click", () => {
    const productId = link.dataset.productId;

    // const container = document.querySelector(
    //   `.js-cart-item-container-${productId}`
    // );
    // container.classList.remove('is-editing-quantity');

    // Here's an example of a feature we can add: validation.
    // Note: we need to move the quantity-related code up
    // because if the new quantity is not valid, we should
    // return early and NOT run the rest of the code. This
    // technique is called an "early return".

    // New quantity update from input element in the checkout.html page
    const quantityInputElement = document.querySelector(
      `.js-quantity-input-${productId}`
    );
    const newQuantity = Number(quantityInputElement.value);
    console.log(newQuantity);

    if (newQuantity < 0 || newQuantity >= 1000) {
      alert("Quantity must be at least 0 and less than 1000");
      return;
    }

    updateQuantity(productId, newQuantity);

    const container = document.querySelector(
      `.js-cart-item-container-${productId}`
      
    );
    container.classList.remove("is-editing-quantity");

    const quantityLabel = document.querySelector(
      `.js-quantity-label-${productId}`
    );
    quantityLabel.innerHTML = newQuantity;

    // calculateCartQuantity();
    calculateCartQuantity(".js-cart-quantity-header", "items");
  });
});

// Naming conflict wouldn't happen, because we are using type="module" Module JS feature
// function updateCartQuantity(){
// let cartQuantity = 0;

// cart.forEach((cartItem) => {
//   cartQuantity += cartItem.quantity;
// });

// document.querySelector('.js-cart-quantity-header')
// .innerHTML = `${cartQuantity} items`;
// }
calculateCartQuantity(".js-cart-quantity-header", "items");

const deliveryOption = document.querySelectorAll(".js-delivery-option");
    // console.log(deliveryOption);
    deliveryOption.forEach((element)=>{ 
     element.addEventListener('click', ()=>{
      // const productId = element.dataset.productId;
      // const deliveryOptionId = element.dataset.deliveryOptionId;
      const {productId ,deliveryOptionId } = element.dataset;
      updateDeliveryOption(productId,deliveryOptionId); // update the data
        renderOrderSummary(); // A function can call/ re-run itself called recursion, regenerate HTML when updating delivery option
        renderPaymentSummary(); // regenerate html (View) after updating data(Model)
     })
 });

 
}


// renderOrderSummary();
// Technique i used here is MVC 
/*
1. Update the data
2. Regenerate all the HTML
 = MVC (MODEL - VIEW - CONTROLLER) popular technique in s/w engineering
 we split our code into 3 parts
*/
