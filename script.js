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

/*for (let i = 0; i < 8; i++) {
    inp = document.getElementById("quantity-input" + i);;
    console.log(inp);
    if(inp) {
        inp.addEventListener('click', () => {
            if (inp.value < 2) {
                inp.value = 1;
            }
    })}
  }*/

if(input) {
    input.addEventListener('click', () => {
        if (input.value < 2) {
            input.value = 1;
        }
})}

var trArray = [];
var rowCounter = 0; // add this global counter variable

function addProduct(currentProduct){
    fetch('data.json')
      .then(response => response.json())
      .then(data => {
    var sproductPrice = document.getElementById("sproduct-price");
    var quantityInput =  document.getElementById("quantity-input");
    console.log(currentProduct)
    // create <tr> element
    var tr = document.createElement("tr");
    tr.id = "tr" + rowCounter; // use the rowCounter variable as part of the id
    console.log(tr.id);
    rowCounter++; // increment the rowCounter

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
    var td5_input = document.createElement("input");
    td5_input.setAttribute("type", "number");
    td5_input.setAttribute("value", quantityInput.value);
    td5_input.setAttribute("id", "quantity-input" + currentProduct);
    if(currentProduct === 1){
        var td6_text = document.createTextNode("$" + data[0].product1.price * quantityInput.value);
    }
    else if(currentProduct === 2){
        var td6_text = document.createTextNode("$" + data[0].product2.price * quantityInput.value);
    }
    else if(currentProduct === 3){
        var td6_text = document.createTextNode("$" + data[0].product3.price * quantityInput.value);
    }
    else if(currentProduct === 4){
        var td6_text = document.createTextNode("$" + data[0].product4.price * quantityInput.value);
    }
    else if(currentProduct === 5){
        var td6_text = document.createTextNode("$" + data[0].product5.price * quantityInput.value);
    }
    else if(currentProduct === 6){
        var td6_text = document.createTextNode("$" + data[0].product6.price * quantityInput.value);
    }
    else if(currentProduct === 7){
        var td6_text = document.createTextNode("$" + data[0].product7.price * quantityInput.value);
    }
    else if(currentProduct === 8){
        var td6_text = document.createTextNode("$" + data[0].product8.price * quantityInput.value);
    }

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
    // Store the tr element in localStorage
    localStorage.setItem('tr' + currentProduct, tr.outerHTML);
})
.catch(error => console.error(error));
}

a.addEventListener( 'click', function(){
    document.getElementById("tr1").remove();
  } );

/*removeButton1 = document.getElementById("fa-times-circle1");
removeButton2 = document.getElementById("fa-times-circle2");
removeButton3 = document.getElementById("fa-times-circle3");
removeButton4 = document.getElementById("fa-times-circle4");
removeButton5 = document.getElementById("fa-times-circle5");
removeButton6 = document.getElementById("fa-times-circle6");
removeButton7 = document.getElementById("fa-times-circle7");
removeButton8 = document.getElementById("fa-times-circle8");

removeButton1.addEventListener('click', () => {
    document.getElementById("tr1").remove();
});
removeButton2.addEventListener('click', () => {
    document.getElementById("tr2").remove();
});
removeButton3.addEventListener('click', () => {
    document.getElementById("tr3").remove();
});
removeButton4.addEventListener('click', () => {
    document.getElementById("tr4").remove();
});
removeButton5.addEventListener('click', () => {
    document.getElementById("tr5").remove();
});
removeButton6.addEventListener('click', () => {
    document.getElementById("tr6").remove();
});
removeButton7.addEventListener('click', () => {
    document.getElementById("tr7").remove();
});
removeButton8.addEventListener('click', () => {
    document.getElementById("tr8").remove();
});*/

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

function load_cart(){
    for (var i = 0; i < localStorage.length; i++) {
        var tbody = document.getElementById("tbody");
        var key = localStorage.key(i);
        var value = localStorage.getItem(key);
        var newTr = document.createElement('tr');
        newTr.innerHTML += value;
        tbody.appendChild(newTr);

        // add event listener to remove the row
        if (newTr.tagName === "TR") {
            var faTimesCircle = newTr.querySelector("#fa-times-circle");
            faTimesCircle.addEventListener("click", function() {
                newTr.remove();
                // remove from localStorage
                localStorage.removeItem(key);
            });
        }
    }
}