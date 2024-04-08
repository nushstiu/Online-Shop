import sneakers from './products.json' assert {type: "json"};
let cartContainer = document.querySelector('.cart-container');

function getCartItems() {
    let cartItems = JSON.parse(localStorage.getItem('cart') || []);
    cartItems.map((cartItem) => {
        let search = sneakers.find((item) => item.id == cartItem.id);
        let productCard = document.createElement('div');
    productCard.classList.add('product-card');
    productCard.innerHTML = `
        <img src="${search.img}" alt=${search.name}">
        <h3>${search.name}<h3>
        `;
    let priceBlock = document.createElement('div');
    priceBlock.classList.add('price-block');
    priceBlock.innerHTML = `<span class="price">${search.price}</span> `;
    let qtyBlock = document.createElement('div');
    qtyBlock.classList.add('qty-block');
    qtyBlock.innerHTML = `
    <i class="fa-solid fa-plus" style="color: #0000000;"></i>
    <p>${cartItem.qty}</p>
    <i class="fa-solid fa-minus style="color: #0000000;"></i>
    `;
    priceBlock.appendChild(qtyBlock);
    // priceBlock.querySelector('.add-to__cart').addEventListener('click', () => {
    //     addToCart(shoes.id);
    // })
    productCard.appendChild(priceBlock);
    cartContainer.appendChild(productCard);  
    }) 
}
getCartItems();