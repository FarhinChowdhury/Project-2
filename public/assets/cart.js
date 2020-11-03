document.querySelector('#cart').addEventListener('click', displayItems)
function displayItems(){
    const cartEl = localStorage.getItem('cartItems');
    let cart =JSON.parse(cartEl)
    let productContainer = document.querySelector('.products')
 
    cart.map(function(item){
         console.log(item)
        productContainer.innerHTML += `
        <div class="cartItem">
            <div class="name">
                <span>${item.name}</span>
            </div>
            <div class= "price">
                <span>${item.price}</span>
            <div class="quantity">
            <span>${item.quantity}</span>
            </div>
            <div class= "total">
                <span>${item.quantity*item.price}</span>
            </div>
        </div>

        `
    })


    



}
displayItems()
