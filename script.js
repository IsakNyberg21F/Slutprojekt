let cart = [];

function addToCart() {
  const title = document.querySelector('.product-title').textContent;
  const price = document.querySelector('.product-price').textContent;
  const size = document.querySelector('#size').value;
  const item = { title, price, size };
  cart.push(item);
  alert('Item added to cart!');
}

function viewCart() {
  console.log(cart);
}