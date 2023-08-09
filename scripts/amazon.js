/* 
Main idea of Javascript
1)Save the data(information)
2)Generate the HTML
3)Make it Interactive
*/

/*1)Save the data(information)*/
const products = [{
  image: '/images/products/athletic-cotton-socks-6-pairs.jpg',
  name:'Black and Gray Athletic Cotton Socks - 6 Pairs',
  ratings:{
    stars:'/images/ratings/rating-45.png',
    count:87 
  },
  priceINR: 10.90
},{
  image:'/images/products/intermediate-composite-basketball.jpg',
  name:'Intermediate Size Basketball',
  ratings:{
    stars:'/images/ratings/rating-40.png',
    count:127
  },
  priceINR: 20.95
},{
  image:'images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg',
  name:'Adults Plain Cotton T-Shirt - 2 Pack',
  ratings:{
    stars:'/images/ratings/rating-45.png',
    count:56
  },
  priceINR: 7.99
},{
  image:'images/products/black-2-slot-toaster.jpg',
  name: '2 Slot Toaster - Black',
  ratings:{
    stars:'images/ratings/rating-50.png',
    count: 2197,
  },
  priceINR:18.99
},{
  image:'images/products/6-piece-white-dinner-plate-set.jpg',
  name: '6 Piece White Dinner Plate Set',
  ratings:{
    stars:'images/ratings/rating-40.png',
    count: 37,
  },
  priceINR:20.67
},{
  image:'images/products/6-piece-non-stick-baking-set.webp',
  name: '6-Piece Nonstick, Carbon Steel Oven Bakeware Baking Set',
  ratings:{
    stars:'images/ratings/rating-45.png',
    count: 37,
  },
  priceINR:34.99
}];


/*2)Generate the HTML*/
let result = '';   /// Accumulator Variable

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
              src="${product.ratings.stars}">
            <div class="product-rating-count link-primary">
              ${product.ratings.count}
            </div>
          </div>

          <div class="product-price">
            ${product.priceINR} INR
          </div>

          <div class="product-quantity-container">
            <select>
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

          <div class="added-to-cart">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary">
            Add to Cart
          </button>
        </div>
 
 `;
 result = result + html;
//  console.log(result);
document.querySelector('.js-product-cont-grid').innerHTML = result;
});



