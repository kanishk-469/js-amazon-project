export const cart = [];

export let selectorCartValNumber ;
// We're going to use an object to save the timeout ids.
// The reason we use an object is because each product
// will have its own timeoutId. So an object lets us
// save multiple timeout ids for different products.
// For example:
// {
//   'product-id1': 2,
//   'product-id2': 5,
//   ...
// }
// (2 and 5 are ids that are returned when we call setTimeout).
const addedMessageTimeouts = {};

 export function addToCart(productId) {
  //Best way written below
  /*
  How do we know which product to add?
  Use Data Attribute of HTML:-
  *It's just another HTML attribute
  *Allows us to attach any information to an element
  */
const selectorCartValue = document.querySelector(`.js-quantity-selector-${productId}`).value;

selectorCartValNumber = Number(selectorCartValue);
// console.log(selectorCartValNumber);

/* Added message when click Add to cart button*/
document.querySelector(`.js-added-to-cart-inc-opacty-${productId}`).classList.add('added-to-cart-opacty');
setTimeout(()=>{
  // Check if there's a previous timeout for this
  // product. If there is, we should stop it.
  const previousTimeoutId = addedMessageTimeouts[productId];
      if (previousTimeoutId) {
        clearTimeout(previousTimeoutId);
      }
  const timeoutId = setTimeout(()=>{
  document.querySelector(`.js-added-to-cart-inc-opacty-${productId}`).classList.remove('added-to-cart-opacty');
},2000);
  // Save the timeoutId for this product
  // so we can stop it later if we need to.
      addedMessageTimeouts[productId] = timeoutId;
});
}