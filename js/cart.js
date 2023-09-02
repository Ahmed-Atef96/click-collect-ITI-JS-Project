//initialize
let cartProducts = [];
let cartString = localStorage.getItem("cart");
if (cartString) {
  cartProducts = JSON.parse(cartString);
}
renderCart(cartProducts);
//Render Cart
function renderCart(products) {
  let cart = document.getElementsByClassName("cart")[0];
  cart.innerHTML = "";
  //----
  let cartCounter = document.getElementsByClassName("cart-counter")[0];
  cartCounter.innerHTML = products.length;
  //----
  products.forEach((product) => {
    cart.innerHTML += `
    <div class="cart-product">
      <div class="cart-product-img"><img style = "width: 50px;" src=${product.image}></div>
      <div class="cart-product-info">
        <p  class="cart-product-title">${product.title}</p>
        <p class="cart-product-price">${product.price} $</p>
      </div>
      </div>
      `;
  });
}
