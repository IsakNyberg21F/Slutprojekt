const bar = document.getElementById('bar');
const close = document.getElementById('close');
const nav = document.getElementById('navbar');
const input = document.getElementById('quantity-input');

if (bar) {
    bar.addEventListener('click', () => {
        nav.classList.add('active');
    })
}

if (close) {
    close.addEventListener('click', () => {
        nav.classList.remove('active');
    })
}

if(input) {
    input.addEventListener('click', () => {
        if (input.value < 2) {
            input.value = 1;
        }
})}

var subtotalValue = 0;

function addProduct(currentProduct) {
  fetch('data.json')
    .then(response => response.json())
    .then(data => {

        // Store the tr element in localStorage
        var cart = JSON.parse(localStorage.getItem("cart")) || [];

        var productExists = cart.some(item => item.id === "tr" + currentProduct);

        if (productExists) {
            // Product already exists, show a message or handle it accordingly
            console.log("Product already added to the cart.");
            return;
        }
        var sproductPrice = document.getElementById("sproduct-price");
        var quantityInput = document.getElementById("quantity-input");

        // create <tr> element
        var tr = document.createElement("tr");
        tr.id = "tr" + currentProduct;

        // create <td> elements
        var td1 = document.createElement("td");
        var td2 = document.createElement("td");
        var td3 = document.createElement("td");
        var td4 = document.createElement("td");
        var td5 = document.createElement("td");
        var td6 = document.createElement("td");

        // create <a> element with <i> child
        var a = document.createElement("a");
        var i = document.createElement("i");
        i.classList.add("far", "fa-times-circle");
        a.setAttribute("href", "#");
        a.appendChild(i);
        a.id = "fa-times-circle";
        td1.appendChild(a);

        // create <img> element
        var img = document.createElement("img");
        img.setAttribute("src", "img/products/f" + currentProduct + ".jpg");
        img.setAttribute("alt", "image");
        td2.appendChild(img);

        // create text nodes for the remaining <td> elements
        var td3_text = document.createTextNode("Rayban " + currentProduct);
        var td4_text = document.createTextNode(sproductPrice.innerText);
        var td5_input = document.createTextNode(quantityInput.value);

        var price = data[0]["product" + currentProduct].price;
        var quantity = parseInt(quantityInput.value);
        var totalPrice = price * quantity;
        subtotalValue += totalPrice;

        var td6_text = document.createTextNode("$" + totalPrice);

        // append the <td> elements to the <tr> element
        td3.appendChild(td3_text);
        td4.appendChild(td4_text);
        td5.appendChild(td5_input);
        td6.appendChild(td6_text);
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        tr.appendChild(td5);
        tr.appendChild(td6);

        cart.push({ id: "tr" + currentProduct, html: tr.outerHTML });
        localStorage.setItem("cart", JSON.stringify(cart));
        localStorage.setItem("subtotalValue", subtotalValue.toString());
    })
    .catch(error => console.error(error));
}

function update_subtotal() {
  var subtotalValue = localStorage.getItem("subtotalValue");
  console.log(subtotalValue);
  var subtotalInput = document.getElementById("cart-subtotal");
  var subtotalInput2 = document.getElementById("cart-subtotal-2");
  if(subtotalValue == null || subtotalValue < 0){
    subtotalInput.innerHTML = "$ " + 0;
    subtotalInput2.innerHTML = "$ " + 0;
  }
  else{
    subtotalInput.innerHTML = "$ " + subtotalValue;
    subtotalInput2.innerHTML = "$ " + subtotalValue;
    localStorage.setItem("subtotalValue", subtotalValue.toString());
  }
}
function load_cart() {
    update_subtotal();
  
    var tbody = document.getElementById("tbody");
    tbody.innerHTML = ""; // Clear the existing table rows
  
    var cart = JSON.parse(localStorage.getItem("cart")) || [];
    console.log(cart);
  
    cart.forEach(item => {
      var newTr = document.createElement("tr");
      newTr.innerHTML = item.html;
      newTr.id = item.id;
      tbody.appendChild(newTr);
  
      // add event listener to remove the row
      var faTimesCircle = newTr.querySelector("#fa-times-circle");
      faTimesCircle.addEventListener("click", function() {
        removeRow(newTr);
      });
    });
  }
  
function removeRow(row) {
    var productId = row.id.replace("tr", "");
    var productPrice = parseFloat(row.querySelector("td:nth-child(6)").textContent.slice(1));
    var subtotalValue = localStorage.getItem("subtotalValue");
  
    // Remove the row from the table
    row.remove();
  
    // Remove the item from the cart in localStorage
    var cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart = cart.filter(item => item.id !== row.id);
    localStorage.setItem("cart", JSON.stringify(cart));
  
    // Subtract the product price from the subtotal value
    subtotalValue -= productPrice;
  
    // Update the subtotal value in localStorage
    localStorage.setItem("subtotalValue", subtotalValue.toString());
  
    // Update the displayed subtotal
    update_subtotal();
  }

function checkout() {
    alert("Thanks for purchase!");
    var subtotalInput = document.getElementById("cart-subtotal");
    var subtotalInput2 = document.getElementById("cart-subtotal-2");
    subtotalInput.innerHTML = "$ " + 0;
    subtotalInput2.innerHTML = "$ " + 0;
    var cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart = [];
    localStorage.setItem("cart", JSON.stringify(cart));
    localStorage.clear();
    load_cart();
}
/*

 // Hämtar JSON-data från ammodata.json
 fetch("data.json")
 .then(response => response.json())
 .then(data => {

     // Hittar HTML-element som visar JSON-data
     const subjectContainer = document.querySelector(".jsonCode");
     const tableBody = subjectContainer.querySelector("table tbody");

     // Loopar igenom objektet som matchar id och skapar en HTML-tabellrad för varje objekt
     for (let i = 0; i < data[id].length; i++) {
     const ammo = data[id][i];

     const newRow = document.createElement("tr");
     newRow.innerHTML = `
        <tr>
            <td><a href="#"><i class="far fa-times-circle"></i></a></td>
            <td><img src="img/products/f1.jpg" alt=""></td>
            <td>Rayban 1</td>
            <td>$60</td>
            <td><input type="number" value="1" id="quantity-input1"></td>
            <td>$60</td>
        </tr>
         <td><img class="icon" src="${ammo.icon}" alt="" style="object-fit: contain;"></td>
         <td>${ammo.name}</td>
         <td>${ammo.fleshDmg}</td>
         <td>${ammo.penetration}</td>
         <td>${ammo.armorDmg}</td>
         <td style="color: ${ammo.recoil <= 0 ? 'green' : 'red'}">${ammo.recoil}</td>
         <td>${ammo.projectileSpeed}</td>
         <td>${ammo.specialEffects}</td>
         <td>${ammo.obtainedBy}</td>
    `;

     // Lägger till raden i HTML-tabellen
     tableBody.appendChild(newRow);
     }
 })
 .catch(error => console.error(error)); */