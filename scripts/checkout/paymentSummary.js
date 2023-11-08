/*
Main idea of Javascript
1) Save the data 
2) Generate the HTML
3) Make it Interactive
*/

import formatCurrency  from "../utils/money.js"; // normal export
import { cart } from "../../data/cart.js";
import { products } from "../../data/products.js";
import { deliveryOptions } from "../../data/deliveryOptions.js";
// products
// deliveryOptions




let totalPriceCents = 0;
let deliveryOptionPrice = 0;
let totalBeforeTax = 0;
let estimatedTax = 0;
let estimatedTaxNumber = 0;
let totalFinalPrice = 0 ;
let totalBeforeTaxNumber = 0;
export function renderPaymentSummary(){
 

  /* Total Cart item's price calculated and stored */
  cart.forEach((cartItem) => {
    const productId = cartItem.productId;
    const deliveryOptionId = cartItem.deliveryOptionId;
  
    let matchingProduct = "";
  
    products.forEach((product) => {
      if (product.id === productId) {
        matchingProduct = product;
      }
    })

    /* Total Cart item's shipping price according to delivery option calculated and stored */
    deliveryOptions.forEach((deliveryOption)=>{
      if(deliveryOptionId === deliveryOption.id){
        deliveryOptionPrice += deliveryOption.priceCents;
      }

    })
  // console.log(matchingProduct);
  totalPriceCents += cartItem.quantity * matchingProduct.priceCents; 
  // console.log(formatCurrency(totalPriceCents));
  // console.log(formatCurrency(deliveryOptionPrice));
  totalBeforeTax =  formatCurrency(totalPriceCents) + formatCurrency(deliveryOptionPrice);
  // console.log(typeof totalBeforeTax);
  totalBeforeTaxNumber = Number(totalBeforeTax.toFixed(2))

  estimatedTax = totalBeforeTax * (10/100 ); 
  // console.log(typeof estimatedTax.toFixed(2));
    estimatedTaxNumber = Number(estimatedTax.toFixed(2));
  
    totalFinalPrice = totalBeforeTaxNumber + estimatedTaxNumber;

  });


document.querySelector('.js-payment-summary')
.innerHTML +=
  `
  <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (3):</div>
            <div class="payment-summary-money">₹${formatCurrency(totalPriceCents)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">₹${formatCurrency(deliveryOptionPrice)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">₹${totalBeforeTaxNumber}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">₹${estimatedTaxNumber}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">₹${totalFinalPrice}</div>
          </div>

          <button class="place-order-button button-primary">
            Place your order
          </button>
          `

};