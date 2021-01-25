fetch("./vansAPI.json")
.then(response => {
   return response.json();
}).then(products => {

    const shoes = products.shoes;
    const productsContainer = document.querySelector('.products-container');


    //CREATE CARDS FOR EACH PRODUCT ( SHOES )
    shoes.forEach(shoe => {
        const cardContent = `
        <div key=${shoe.key} color=${shoe.color} type=${shoe.type} class="product-card">
            <div class="product-card-img">
                <img src="https://raw.githubusercontent.com/WebDevEdd/VansOffTheWall/master/images/Shoes/${shoe.image}" alt="">
            </div>
            <h3 class="product-card-name">
                ${shoe.name}
            </h3>
            <p class="product-card-price">
                $${shoe.price}
            </p>
            <button class="add-to-cart">
                add to cart
            </button>
        </div>
        `
        try {
            productsContainer.innerHTML += cardContent;
        }
        catch(error) {}
        
    });



    //Push Product to local Storage
    const addItemToCart = () => {
        const addBtn = document.querySelectorAll('.add-to-cart');

        addBtn.forEach(btn => {
            btn.addEventListener('click', () => {
                const itemKey = btn.parentElement.getAttribute('key');
                const item = shoes.find(el => el.key == itemKey);

                localStorage.setItem(itemKey, JSON.stringify(item));
                //update cart num on click
                numOfCartItems.innerHTML = localStorage.length;
            })
        });

        
    };

    addItemToCart();
    //update cart num on load
    numOfCartItems.innerHTML = localStorage.length;
});

const cartRow = () => {
    const storedItems = localStorage;
    const storedItemsKeys = Object.keys(storedItems);
    const cartContainer = document.querySelector('.cart');

    storedItemsKeys.forEach(key => {
        const storedKeys = parseInt(key);

        const storedItemProps = JSON.parse(storedItems.getItem(storedKeys));

        const rowContent = `
            <div id=${storedItemProps.key} class="cart-row">
                <div class="cart-row-section">
                    <p class='rmv-btn'>x</p>
                    <img class="cart-row-img" src="https://raw.githubusercontent.com/WebDevEdd/VansOffTheWall/master/images/Shoes/${storedItemProps.image}" alt="">
                </div>
                <div class="cart-row-section">
                    <p class="cart-row-name">${storedItemProps.name}</p>
                </div>
                <div class="cart-row-section">
                    <p class="cart-row-price">$${storedItemProps.price}</p>
                </div>
            </div>
        `
        try {
            cartContainer.innerHTML += rowContent;
        }
        catch(error) {}
    });

}
//numOfCartItems
const numOfCartItems = document.querySelector('.num-of-cart-items');
numOfCartItems.innerHTML = localStorage.length;

cartRow();

const removeFromStorage = () => {
    const rmvBtn = document.querySelectorAll('.rmv-btn');

    rmvBtn.forEach(btn => {
        const btnKey = btn.parentElement.parentElement.id;
        
        btn.addEventListener('click', function() {
            localStorage.removeItem(btnKey);
            numOfCartItems.innerHTML = localStorage.length;

            const cartContainer = document.querySelector('.cart');

            location.reload(cartContainer);
        })
    })
};
removeFromStorage();

const cartTotal = () => {
    const storedItems = localStorage;
    const storedItemsKeys = Object.keys(storedItems);

    const prices = [];
    
    storedItemsKeys.forEach(key => {
        const storedKeys = parseInt(key);

        const storedItemProps = JSON.parse(storedItems.getItem(storedKeys));

        prices.push(storedItemProps.price);

    })
    var total = prices.reduce(function(a, b){
        return a + b;
    }, 0);

    var grandTotalReduced = total.toFixed(2)

    console.log(grandTotalReduced);

    const cartTotal = document.querySelector('.cart-total-span');
     try {
        cartTotal.innerHTML = grandTotalReduced;
     }
     catch(error) {}
    

};
cartTotal();

