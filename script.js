let hasItem = false;
let itemTotal = invoice[0].total;
let delivery = invoice[0].delivery;
let payment = invoice[0].payment;
const deliveryCost = 5.9;

let overlayRef = document.getElementById('basket-frame');
let overlayBtn = document.getElementById('to-basket');
let overlayShadow = document.getElementById('menu-frame');
let overlayMenuRef = document.getElementById('menu');
let overlayFooterRef = document.getElementById('footer')
const selectDelivery = document.getElementById('select-delivery');
const selectPick = document.getElementById('select-pick');

function init() {
    getFromLocalStorage();
    renderMenu('pasta');
    renderMenu('pizza');
    renderMenu('dish');
    renderMenu('drink');
    renderBasket();
}

function renderMenu(category) {
    let contentRef = document.getElementById(category);
    contentRef.innerHTML="";

    for (let index = 0; index < menu.length; index++) {
        if (menu[index].category === category) {
        contentRef.innerHTML += getMenuItemTemplate(menu[index], index);
       }
    }
}

function renderBasket() {
    renderItem();

    if (hasItem) {
        renderPayment()
    } 
    else {    
        emptyBasket();
    }
}

function renderItem() {
    let contentRef = document.getElementById('basket-item');
    contentRef.innerHTML="";

    for (let index = 0; index < menu.length; index++) {
        if (menu[index].quantity > 0) {
        contentRef.innerHTML += getBasketItemTemplate(menu[index], index);
        hasItem = true;
       } 
    };
}

function renderPayment() {
    let contentRef = document.getElementById('payment');
    contentRef.innerHTML="";
    calculateTotal();
    if (itemTotal > 0) {
        contentRef.innerHTML += getBasketPaymentTemplate(itemTotal, delivery, payment);
        renderMinValue()
    } else {
        emptyBasket();
    }
}

function emptyBasket() {
    let contentRef = document.getElementById('basket-item');
    contentRef.innerHTML="";
    contentRef.innerHTML += getBasketEmptyTemplate();
    
}

function getFromLocalStorage(){
    let basket = JSON.parse(localStorage.getItem("menu"));
    let basketTotal = JSON.parse(localStorage.getItem("invoice"));
    if (basket && basket.length > 0) {
    menu = basket;
    }
    if (basketTotal && basketTotal.length > 0) {
    invoice = basketTotal
    }
}

function saveItemToLocalStorage(){
    localStorage.setItem("menu", JSON.stringify(menu));
}

function saveTotalToLocalStorage(){
    localStorage.setItem("invoice", JSON.stringify(invoice));
}

function addQuantity(index) {
    menu[index].quantity = menu[index].quantity + 1;
    menu[index].sum = menu[index].quantity * menu[index].price;
    updateBasket()
}

function reduceQuantity(index) {
    menu[index].quantity = menu[index].quantity - 1;
    menu[index].sum = menu[index].quantity * menu[index].price;
    updateBasket()
}

function deleteItem(index) {
    menu[index].quantity = 0;
    menu[index].sum = 0;
    updateBasket()
}

function deleteAllItem() {
    for (let index = 0; index < menu.length; index++) {
        menu[index].quantity = 0;
        menu[index].sum = 0;
    };
    updateBasket()
}

function calculateTotal(){
    itemTotal = 0;
    if  (selectDelivery.checked) {
        delivery = deliveryCost
    }
    else {
        delivery = 0;
    }

    for (let index = 0; index < menu.length; index++) {
        itemTotal = itemTotal + menu[index].sum
    };
    payment = itemTotal + delivery;
    invoice[0].total = itemTotal;
    invoice[0].delivery = delivery;
    invoice[0].payment = payment;
}

function updateBasket() {
    saveItemToLocalStorage();
    updateDelivery();
}

function updateDelivery() {
    calculateTotal();
    saveTotalToLocalStorage();
    renderBasket();
    renderMinValue()
}

selectDelivery.addEventListener('change', () => {
    if (selectDelivery.checked) {
       updateDelivery();
    }
});

selectPick.addEventListener('change', () => {
    if (selectPick.checked) {
        updateDelivery();
    }
});

function renderMinValue(){
        let minValueElement = document.getElementById("min-value");
        let orderButtonElement = document.getElementById('btn');
        minValueElement.innerHTML = "";
        
        if (delivery === 5.9 && payment < 10 && itemTotal > 0.01) {
            minValueElement.innerHTML += getMinValueTemplate();
            orderButtonElement.disabled = true;
            orderButtonElement.classList.add("no-hover");
        }
        else {
            orderButtonElement.disabled = false;
            orderButtonElement.classList.remove("no-hover");
        }
    }

function renderOrderOverlay() {
    const overlay = document.getElementById("overlay-ordered");
    overlay.style.display = "flex";
    document.body.style.overflow = 'hidden';
    overlay.innerHTML=getOverlayOrderedTemplate();
}

function closeOrderOverlay() {
    const overlay = document.getElementById("overlay-ordered");
    overlay.style.display = "none";
    document.body.style.overflow = '';
    deleteAllItem()
    localStorage.clear();
}

function clickRespBasket() {
    if (overlayBtn.innerText === "Zum Warenkorb") {
        showRespBasket()
    }
    else {
        closeRespBasket()  
    }  
}

function showRespBasket() {
    overlayBtn.innerHTML="zurück zum Menü";
    overlayRef.style.display = "flex";
    overlayMenuRef.classList.add('d-none');
    overlayFooterRef.classList.add('d-none');
    removeSrollbar();
}

function closeRespBasket() {
    overlayBtn.innerHTML="Zum Warenkorb";
    overlayRef.style.display = "";
    document.body.style.overflow = '';
    overlayMenuRef.classList.remove('d-none');
    overlayFooterRef.classList.remove('d-none');
}

function handleResize() {
    if (window.innerWidth > 768) {
        closeRespBasket();
    }
}

function removeSrollbar() {
    window.scrollTo(0, 0);
    setTimeout(() => {
    document.body.style.overflow = 'hidden';
    }, 5);
}

window.addEventListener('resize', handleResize);