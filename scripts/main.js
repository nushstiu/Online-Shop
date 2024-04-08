import sneakers from './products.json' assert {type: 'json'}

let productContainer = document.querySelector('.product-container');

function createShop() {
    sneakers.forEach((shoes) => {
    let productCard = document.createElement('div');
    productCard.classList.add('product-card');
    productCard.innerHTML = `
    <img src="${shoes.img}" alt=${shoes.name}">
    <h3>${shoes.name}<h3>
    <p>${shoes.category}<p>
    `;

    let favoriteBlock = document.createElement('div');
    favoriteBlock.classList.add('favorite-block');
    favoriteBlock.innerHTML = `<img src="${shoes.fav}" class="faved">`;
    let favedImg = favoriteBlock.querySelector('.faved');
    let favorite = JSON.parse(localStorage.getItem('favorite')) || [];
    if (favorite.some(item => item.id === shoes.id)) {
        favedImg.src = '../img/Colored.svg';
    } else {
        favedImg.src = shoes.fav;
    }
    let selected = favorite.some(item => item.id === shoes.id);
    // let selected = false;
    favedImg.addEventListener('click', () => {
        if (!selected) {
            favedImg.src = '../img/Colored.svg';
        } else {
            favedImg.src = shoes.fav;
        }
        selected=!selected
    });
    favoriteBlock.querySelector('.faved').addEventListener('click', () => {
        addToFav(shoes.id);
    })
    


    let priceBlock = document.createElement('div');
    priceBlock.classList.add('price-block');
    priceBlock.innerHTML = `
    <span class="price">${shoes.price}</span>
    <button class='add-to__cart'>Add to cart</button>
    `;
    priceBlock.querySelector('.add-to__cart').addEventListener('click', () => {
        addToCart(shoes.id);
    })
    productCard.appendChild(priceBlock);
    productCard.appendChild(favoriteBlock);
    productContainer.appendChild(productCard);

})
}
createShop();

// localStorage.clear();

let totalProductsParagraph = document.querySelector('.total-products');
totalProductsParagraph.textContent = `${sneakers.length} Products`

let cart = JSON.parse(localStorage.getItem('cart')) || []; //setam array curat initial caci nu trebuie sa avem valoare null.Noi o sa salvam elementele in array, si array-ul in localStorage
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
    
let addToFav = (id) => {
    let product = sneakers.find(item => item.id === id);
    let favorite = JSON.parse(localStorage.getItem('favorite')) || [];
    let index = favorite.findIndex(item => item.id === id);
    if (index === -1) {
        favorite.push(product);
    } else {
        favorite.splice(index, 1);
    }
    localStorage.setItem('favorite', JSON.stringify(favorite));

}

const swiper = new Swiper('.swiper', {
    direction: 'horizontal',
    loop: true,

    pagination: {
        el: '.swiper-pagination',
        clickable: true,
        // hideOnClick: true
    },

    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },

});