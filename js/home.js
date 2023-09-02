//  ----------------------------------------- Start of carousel -------------------------------------
let slider = document.getElementsByClassName("img-sliding")[0];
let rightCarousel = document.getElementsByClassName("right-carousel")[0];
let leftCarousel = document.getElementsByClassName("left-carousel")[0];

let currentSlide = 1;
let sliderProducts = [
  { image: "./imgs/carousel4.jpg" },
  { image: "./imgs/carousel1.jpg" },
  { image: "./imgs/carousel2.jpg" },
  { image: "./imgs/carousel3.jpg" },
];

function nextSlide() {
  currentSlide++;
  if (currentSlide == 4) {
    currentSlide = 0;
  }
  slider.src = sliderProducts[currentSlide].image;
}
function prevSlide() {
  currentSlide--;
  if (currentSlide == 0) {
    currentSlide = 3;
  }
  slider.src = sliderProducts[currentSlide].image;
}
let interval;
function restartInterval() {
  if (interval) {
    clearInterval(interval);
  }
  interval = setInterval(() => {
    nextSlide();
  }, 3000);
}
restartInterval();
rightCarousel.onclick = function () {
  nextSlide();
  restartInterval();
};

leftCarousel.onclick = function () {
  prevSlide();
  restartInterval();
};

//  ----------------------------------------- End of carousel -------------------------------------
//  ----------------------------------------- Start of categories -------------------------------------

//render Categories function
function renderCategories(categories) {
  categories.forEach((category) => {
    let categoriesContainer = document.getElementsByClassName("categories")[0];
    let categoryButton = document.createElement("button");
    categoryButton.classList.add("categoryButton");
    categoryButton.textContent = category;
    categoryButton.onclick = function () {
      loadCategoryProducts(category);
    };
    categoriesContainer.append(categoryButton);
  });
}

//load categories function
async function loadCategories() {
  try {
    let response = await fetch("https://fakestoreapi.com/products/categories");
    let categories = await response.json();
    renderCategories(categories);
    loadCategoryProducts(categories[0]);
  } catch (error) {
    console.log("error", error);
  }
}
loadCategories();

//  ----------------------------------------- End of categories -------------------------------------
//  ----------------------------------------- Start of Products -------------------------------------

//initialize
let cartProducts = [];
let cartString = localStorage.getItem("cart");
if (cartString) {
  cartProducts = JSON.parse(cartString);
}
renderCart(cartProducts);
//Render Cart
function renderCart(products) {
  // clear cart before drawing again
  let cart = document.getElementsByClassName("cart")[0];
  cart.innerHTML = "";
  //---- update cart counter
  let cartCounter = document.getElementsByClassName("cart-counter")[0];
  cartCounter.innerHTML = products.length;
  //---- draw cart items
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

//Render products function
function renderProducts(products) {
  let productsContainer = document.getElementsByClassName("products")[0];
  productsContainer.innerHTML = "";
  products.forEach((product) => {
    let productContainer = document.createElement("div");
    productContainer.setAttribute("class", "product");
    productsContainer.append(productContainer);
    // ____________________
    let imageContainer = document.createElement("div");
    imageContainer.classList.add("image-container");
    let productImage = document.createElement("img");
    productImage.src = product.image;
    imageContainer.append(productImage);
    productContainer.append(imageContainer);
    // ____________________
    let productContent = document.createElement("div");
    productContent.setAttribute("class", "content");
    productContainer.append(productContent);
    // ____________________
    let productTitleDiv = document.createElement("div");
    productTitleDiv.setAttribute("class", "product-title-div");
    let productTitle = document.createElement("h3");
    productTitle.textContent = product.title;
    productTitleDiv.append(productTitle);
    productContent.append(productTitleDiv);

    // ____________________
    let descriptionDiv = document.createElement("div");
    descriptionDiv.classList.add("description-container");
    let productDescription = document.createElement("p");
    productDescription.textContent = product.description;
    descriptionDiv.append(productDescription);
    productContent.append(descriptionDiv);
    // ____________________
    let productPrice = document.createElement("p");
    productPrice.setAttribute("class", "price");
    productPrice.textContent = product.price + " $";
    productContent.append(productPrice);
    // ____________________

    let productInfo = document.createElement("div");
    productInfo.setAttribute("class", "info");
    productContainer.append(productInfo);
    // ____________________
    let addToCart = document.createElement("button");
    addToCart.setAttribute("class", "add-to-cart");
    addToCart.textContent = "Add to cart";
    productInfo.append(addToCart);
    // ------------

    //add to cart
    addToCart.onclick = function () {
      //write cart
      cartProducts.push(product);
      localStorage.setItem("cart", JSON.stringify(cartProducts));
      //read cart
      //Render Cart

      renderCart(cartProducts);
    };

    // ____________________
    let cartIcon = document.createElement("i");
    cartIcon.setAttribute("class", "fa-solid fa-cart-plus");
    productInfo.append(cartIcon);
  });
}

//load loadCategory Products function
async function loadCategoryProducts(categoryName) {
  try {
    let response = await fetch(
      `https://fakestoreapi.com/products/category/${categoryName}`
    );
    let products = await response.json();
    renderProducts(products);
  } catch (error) {
    console.log("error");
  }
}

//  ----------------------------------------- End of Products -------------------------------------

//cart hover showing and disappear
let cartIcon = document.getElementsByClassName("cart-icon")[0];
cartIcon.onmouseenter = function () {
  let cart = document.getElementsByClassName("cart")[0];
  cart.style.display = "block";
};
cartIcon.onmouseleave = function () {
  let cart = document.getElementsByClassName("cart")[0];
  cart.style.display = "none";
};

//scroll button
let scrollUp = document.getElementsByClassName("scroll-up")[0];
scrollUp.onclick = function () {
  window.scrollTo(0, 0);
};
window.onscroll = function () {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    scrollUp.style.display = "flex";
  } else {
    scrollUp.style.display = "none";
  }
};
