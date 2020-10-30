let cart = document.querySelectorAll(".add-cart")

let products = [
    {   name:"Shrek Pillow",
        tag:"shrekpillow",
        price:18,
        inCart:0
    },
    {
        name:"Shrek Pillow Small",
        tag:"shrekpillow-sm",
        price:9.99,
        inCart:0
    },
    {
        name:"Shrek Duvet Cover",
        tag:"shrekduvet",
        price:111.99,
        inCart:0
    },
    {
        name:"Shrek Cup",
        tag:"shrekcup",
        price:12,
        inCart:0
    }
    
]

//add to cart

const cartItems = localStorage.cartItems ? JSON.parse(localStorage.cartItems): []
function addToCart(productTag){
    console.log(`product picked`,productTag)
    const productExsist = products.filter(item=>item.tag===productTag)
    const product = productExsist[0]
    cartItems.push(product)
    
    localStorage.cartItems = JSON.stringify(cartItems)
    console.log(cartItems.length)


    const cartCounter = localStorage.cartCounter = cartItems.length

    document.querySelector("#cartCounter").textContent = cartCounter;

}



function remeberCartItems(){
    let cartHistory= localStorage.getItem('cartCounter');
    if(cartHistory){
        document.querySelector("#cartCounter").textContent = cartHistory
    }
}

function displayCartItems(){

}

remeberCartItems()

