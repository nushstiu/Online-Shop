import sneakers from './products.json' assert {type: "json"};
let FavContainer = document.querySelector('.fav-container');

function getFavItems() {
    let FavItems = JSON.parse(localStorage.getItem('favorite')) || [];
    FavItems.map((favoriteItem) => {
        let search = sneakers.find((item) => item.id == favoriteItem.id);
        let productFav = document.createElement('div');
        productFav.classList.add('product-fav');
        productFav.innerHTML = `
            <img src="${search.img}" alt="${search.name}">
            <h3>${search.name}</h3>
        `;
        let priceBlock = document.createElement('div');
        priceBlock.classList.add('price-block');
        priceBlock.innerHTML = `
            <span class="price">${search.price}</span> 
            <button class='add-to__cart'>Add to cart</button>`;
        productFav.appendChild(priceBlock);
        FavContainer.appendChild(productFav);

        priceBlock.querySelector('.add-to__cart').addEventListener('click', () => {
            addToCart(search.id);
        });
    });
}
getFavItems();


let cart = JSON.parse(localStorage.getItem('cart')) || [];
let addToCart = (id) => {
    let search = cart.find((cartItem) => cartItem.id === id);
    if(search === undefined){
        cart.push({
            id: id,
            qty: 1
        })
    } else {
        search.qty +=1;
    }
    localStorage.setItem('cart', JSON.stringify(cart));
}