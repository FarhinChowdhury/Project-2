let cartProd = []

class CartItem {
    constructor(name,price){
        this.name = name
        this.price = price
    }
}

$(document).ready(function() {
    console.log('loaded page...')
    $.get('/api/bids', function(res) {
        console.log('Searching product database...')
        // window.location.href = '/product';
        if(res.length<1){
            console.log('No results found...')
        }
        console.log('RESPONSE:',res)
        res.forEach(function(el){
            $('#cardContainer').append(`
            <div class="card m-2 p-0" style="width: 16rem;">
                <img class="card-img-top" id="productImage" src="${el.image}" alt="Card image cap">
                <div class="card-body">
                    <h5 class="card-title m-0" id="productName">${el.name}</h5>
                    <p class="card-text m-0" id="productDesc">${el.desc}</p>
                    <p class="card-text m-0" id="productStock">Stock: ${el.stock}</p>
                    <p class="card-text m-0" id="productCat">${el.category}</p>
                    <p class="card-text m-0" id="productBid">Starting Bid: ${el.price.toFixed(2)}</p>
                    <a href="#" class="btn btn-primary m-0 mt-2">Make a Bid</a>
                    <a href="#" onClick="pushToCart('${el.name}',${el.price})" class="btn btn-primary mt-2">Buy Now</a>

                </div>
            </div>
            `
            )
        })
    });
});

const cartItemsProd = localStorage.cartItems ? JSON.parse(localStorage.cartItems): []
let num = 0
function pushToCart(name,price){
    let cartItem = new CartItem(name,price)
    cartProd.push(cartItem)
    localStorage.cartItems = JSON.stringify(cartProd)
    console.log(localStorage.cartItems)
    num++
    $('#cartCounter').text(num)

}

// function addToCart(productTag,productPrice){
//     console.log('product picked',productTag)
//     console.log('product Price', productPrice)
//     const productExsist = products.filter(item=>item.tag===productTag)
//     const product = productExsist[0]
//     cartItems.push(product)

//     localStorage.cartItems = JSON.stringify(cartItems)
//     console.log(cartItems.length)


//     cartCounter = localStorage.cartCounter = cartItems.length

//     document.querySelector('#cartCounter').textContent = cartCounter;

// }

// function remeberCartItems(){
//     let cartHistory= localStorage.getItem('cartCounter');
//     if(cartHistory){
//         document.querySelector('#cartCounter').textContent = cartHistory
//     }
// }
