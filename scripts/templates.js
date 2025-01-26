function getMenuItemTemplate(item, index) {
    return `
    <div class="menu-item">
        <div class="menu-item-line">
            <h3>${item.name}</h3>
            <p>${item.description}</p>
            <p class="price">${item.price.toFixed(2)} €</p>
        </div>  
        <div>
            <img class="menu-plus" onclick="addQuantity(${index})" src="./assets/icons/noun-add-7401647-FF8360.svg" alt="Plus Zeichen">
        </div>
    </div>
    `;
}

function getBasketItemTemplate(item, index) {
    return `
        <h3>${item.name}</h3>
        <div class="figure">
            <div class="quantity">
                <img class="basket-icon" onclick="reduceQuantity(${index}) "src="./assets/icons/noun-minus-7280435-FF8360.svg" alt="Minuszeichen">
                <span>${item.quantity}x</span>
                <img class="basket-icon" onclick="addQuantity(${index})" src="./assets/icons/noun-add-7401647-FF8360.svg" alt="Pluszeichen">
            </div>
            <span>${item.sum.toFixed(2)} €</span>
            <img class="basket-icon-delete" onclick="deleteItem(${index})" src="./assets/icons/noun-trash-7389748-FF8360.svg" alt="Papierkorb">
        </div>
       
    `;
}

function getBasketPaymentTemplate(itemTotal, delivery, payment) {
    return `
        <div class="divider"></div>              
        <table>
        <tr>
            <td>Zwischensumme:</td>
            <td class="right-align">${itemTotal.toFixed(2)} €</td>
        </tr>
        <tr>
            <td>Lieferkosten:</td>
            <td class="right-align">${delivery.toFixed(2)} €</td>
        </tr>
        <tr class="tr-total">
            <td>Gesamtbetrag:</td>
            <td class="right-align">${payment.toFixed(2)} €</td>
        </tr>
        </table>
        <button class="btn no-hover" id="btn" onclick="renderOrderOverlay()">Bestellen</button>
        
    `;
}

function getBasketEmptyTemplate() {
    return `
        <div class="empty-basket">
            <img src="./assets/icons/shopping-basket.svg" alt="Einkaufskorb">
            <h3>Fülle deinen Warenkorb</h3>
            <p>Füge einige leckere Gerichte <br>aus der Speisekarte hinzu <br> und bestelle dein Essen.</p>
        </div> 
    `;
}

function getOverlayOrderedTemplate() {
    return `
        <div class="overlay-ordered-content" onclick="event.stopPropagation()">
            <p>Die Testbestellung war erfolgreich!</p>
            <button class="btn" onclick="closeOrderOverlay()">Schließen</button>
        </div>
    `;
}

function getMinValueTemplate() {
    return `<p class="min-value">Der Mindestbestellwert <br>beträgt 10 Euro.`
}

