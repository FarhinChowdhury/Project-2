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
                    <p class="card-text m-0" id="productBid">Starting Bid: $${el.price}</p>
                    <a href="#" class="btn btn-primary m-0 mt-2">Make a Bid</a>
                    <a href="#" onClick = "addToCart('${el.name}','${el.price}', ${el.stock})" class="btn btn-primary mt-2">Buy Now</a>

                </div>
            </div>
            `
            )
        })

        
        

    




    });
});

const cartItems = localStorage.cartItems ? JSON.parse(localStorage.cartItems): []
const itemQuantity = localStorage.cartItems ? JSON.parse(localStorage.cartItems): []

function addToCart(productName, productPrice, stock){
    console.log(`product picked`,productName)
    console.log(`product price:`,productPrice)
    let quantity=1
    console.log('inital stock:', stock)
    for(var i=0;i<cartItems.length;i++){
        if(cartItems[i].name===productName){
            cartItems[i].quantity= quantity++
            stock--
            if(stock===0){
                console.log(`current stock`, stock)
                document.querySelectorAll("#productStock").innerHTML += `<p>Out of Stock.</p>`

            }



        }else{
            quanity=1
            stock-- 
        }


    }
    cartItems.push({name:productName, price:productPrice, quantity:quantity})
    
    

    console.log(cartItems)
   
    localStorage.cartItems = JSON.stringify(cartItems)
    const cartCounter = localStorage.cartCounter = cartItems.length


    document.querySelector("#cartCounter").textContent = cartCounter;
}

function remeberCartItems(){
    let cartHistory= localStorage.getItem('cartCounter');
    if(cartHistory){
        document.querySelector("#cartCounter").textContent = cartHistory
    }
}


remeberCartItems()

