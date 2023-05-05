const bar = document.getElementById('bar');
const close = document.getElementById('close');
const nav = document.getElementById('navbar');
const input = document.getElementById('quantity-input');
const input1 = document.getElementById('quantity-input1');
const input2 = document.getElementById('quantity-input2');
const input3 = document.getElementById('quantity-input3');

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
if(input1) {
    input1.addEventListener('click', () => {
        if (input1.value < 2) {
            input1.value = 1;
        }
})}
if(input2) {
    input2.addEventListener('click', () => {
        if (input2.value < 2) {
            input2.value = 1;
        }
})}
if(input3) {
    input3.addEventListener('click', () => {
        if (input3.value < 2) {
            input3.value = 1;
        }
})}

