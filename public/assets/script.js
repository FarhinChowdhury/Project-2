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



for (i=0;i<cart.length;i++){
    cart[i].addEventListener('click',()=>{
        cartNumbers(products[i])
        totalCost(products[i])
    })
}
//add to cart
function cartNumbers(product){
    console.log(product)
    let productNumbers= localStorage.getItem('cartNumbers');
    productNumbers=parseInt(productNumbers)

    if(productNumbers){
        localStorage.setItem('cartNumbers',productNumbers + 1) 
        document.querySelector("#cartCounter").textContent = productNumbers + 1; 
    }else{
    localStorage.setItem('cartNumbers', 1)
    document.querySelector("#cartCounter").textContent = 1;
    } 
    setItems(product)
}

function setItems(product){
    let cartItems = localStorage.getItem("productsPicked")
    cartItems = JSON.parse(cartItems);
    

    if(cartItems!=null){
        if(cartItems[product.tag] == undefined){
            cartItems = {
                ...cartItems,
                [product.tag]:product
            }
        }
        cartItems[product.tag].inCart +=1;
    }else{
        product.inCart = 1;
        cartItems = {[product.tag]: product}
    }
    
   
    localStorage.setItem("productsPicked", JSON.stringify(cartItem))
}

//remembers previous selections into cart

function remeberCartItems(){
    let productNumbers= localStorage.getItem('cartNumbers');
    if(productNumbers){
        document.querySelector("#cartCounter").textContent = productNumbers
    }
}

function totalCost(product){
    let cartCost = localStorage.getItem('totalCost');
    

    if(carCost != null){
        cartCost = parseFloat(cartCost)
        localStorage.setItem('totalCost', cartCost+ product.price)

    }else{
    localStorage.setItem("totalCost", product.price)
    }
}

function displayItems(){
    let cartItems = localStorage.getItem("productPicked")
    cartItems= JSON.parse(cartItems)
    let productContainer = document.querySelector(".product")

    if(cartItems && productContainer){
        console.log("running")
        productContainer.innerHTML ='';
        Object.values(cartItems).map(item=>{
            productContainer.innerHTML +=`
            <div class="product">
                <i class="far fa-times-circle"></i>
                <span>${item.name}</span>
            </div>
            <div class="price">$${item.price}</div>
            <input class="qantity>${item.inCart}>
            `
        })

    }
}
remeberCartItems()
displayItems()