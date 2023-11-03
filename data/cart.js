export let cart = JSON.parse(localStorage.getItem('cart'));

if(!cart){            // default value set 
cart = [
  {
    productId:"e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    quantity: 2,
    deliveryOptionId : '1'
  },{
    productId:"15b6fc6f-327a-4ec4-896f-486349e85a3d",
    quantity: 1,
    deliveryOptionId : '2'
  }
];
}

function saveToStorage(){     // storing cart value to Browser's Local storage system
  localStorage.setItem('cart', JSON.stringify(cart));

}

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

export function updateCartQuantity(productId){
  let matchingItem;
  
  cart.forEach((cartItem)=>{
    if(productId === cartItem.productId){
     matchingItem = cartItem;
    }});
  
    if(matchingItem){
     // matchingItem.quantity +=1;
  
     matchingItem.quantity +=selectorCartValNumber;
     }else{
       cart.push({
       //  productId: productId,
        productId,  // shorthand property
       //  quantity: 1,
        quantity: selectorCartValNumber,
        deliveryOptionId: '1',
       })
     }
  //  console.log(cart);
  
  let cartQuantity = 0 ;
    cart.forEach((cartItem)=>{
    cartQuantity = cartQuantity + cartItem.quantity;
  })
  document.querySelector('.js-cart-quantity').textContent = cartQuantity;
  saveToStorage();
  }

  export function removeFromCart(productId){
  const newCart = [];
  cart.forEach(cartItem =>{
    if(cartItem.productId !== productId){
      newCart.push(cartItem);
    }
  });
  cart = newCart;
  // console.log(cart);
  saveToStorage();
  }


  export function calculateCartQuantity(strigClss = '', rightSide = ''){
 let cartQuantity = 0;

cart.forEach((cartItem) => {
  cartQuantity += cartItem.quantity;
});

if(strigClss === '' && rightSide === ''){
return;
}else{
document.querySelector(strigClss)
.innerHTML = `${cartQuantity} ` + rightSide;
}
  }


  export function updateQuantity(productId,newQuantity){
    let matchingItem;
  
    cart.forEach((cartItem)=>{
    if(productId === cartItem.productId){
     matchingItem = cartItem;
    }
  });
   matchingItem.quantity = newQuantity;

  saveToStorage();
  }

   export function updateDeliveryOption(productId, deliveryOptionId){
    let matchingItem;
    cart.forEach((cartItem)=>{
      if(productId === cartItem.productId){
       matchingItem = cartItem;
      }});
    matchingItem.deliveryOptionId = deliveryOptionId;
    saveToStorage();
  }