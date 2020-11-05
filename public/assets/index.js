let searchInputMain
let searchBtn
let cartMain = []

class CartItemMain {
    constructor(name,price){
        this.name = name
        this.price = price
    }
}

$(document).ready(function() {
    console.log('ready')
    searchInputMain = $('#searchBox')
    searchBtn = $('#searchBtn')

    function getProduct(Post) {
        console.log('submitting: ',Post)
        $.get(`/api/search/${Post}`, Post, function(res) {
            console.log('Searching product database...')
            // window.location.href = '/product';
            if(res.length<1){
                console.log('No results found...')
            }
            console.log('RESPONSE:',res)
            $('#modalDesc').html('')
            res.forEach(function(el){
                console.log(el.name)
                $('#modalDescMain').append(`
                <div class="card m-2 p-0">
                    <img class="card-img-top" id="productImage" src="${el.image}" alt="Card image cap">
                    <div class="card-body">
                        <h5 class="card-title m-0" id="productName">${el.name}</h5>
                        <p class="card-text m-0" id="productDesc">${el.desc}</p>
                        <p class="card-text m-0" id="productStock">Stock: ${el.stock}</p>
                        <p class="card-text m-0" id="productCat">${el.category}</p>
                        <p class="card-text m-0" id="productBid">Price: ${el.price.toFixed(2)}</p>
                        <button href="#" onClick="pushToCartMain('${el.name}',${el.price})" class="btn btn-primary mt-2">Buy Now</button>
                    </div>
                </div>
                `
                )
            })
            $('#myModal2').modal({show:true});

        });
    }
    // Adding an event listener for when the form is submitted
    $(searchBtn).on('click', function handleFormSearch(event) {
        event.preventDefault();
        console.log('click', searchInputMain.val())
        if (!searchInputMain.val()) {
            console.log('Please enter your search in the search box.')
            return;
        }
        var search = searchInputMain.val().trim()
        console.log(search);
        getProduct(search)
    });
    $.get('/api/bids', function(res) {
        console.log('Searching product database...')
        // window.location.href = '/product';
        if(res.length<1){
            console.log('No results found...')
        }
        console.log('RESPONSE:',res)
        res.forEach(function(el,i){
            if (i>3){
                return;
            }
            $('#featuredCards').append(`
            <div class="card m-2 p-0" style="width: 16rem;">
                <img class="card-img-top" id="productImage" src="${el.image}" alt="Card image cap" >
                <div class="card-body">
                    <h5 class="card-title m-0" id="productName">${el.name}</h5>
                    <p class="card-text m-0" id="productDesc">${el.desc}</p>
                    <p class="card-text m-0" id="productStock">Stock: ${el.stock}</p>
                    <p class="card-text m-0" id="productCat">${el.category}</p>
                    <p class="card-text m-0" id="productBid">Price: ${el.price.toFixed(2)}</p>
                    <a href="#" onClick="pushToCartMain('${el.name}',${el.price})" class="btn btn-primary mt-2">Buy Now</a>

                </div>
            </div>
            `
            )
        })
    });

});

let num = 0
function pushToCartMain(name,price){
    let cartItem = new CartItemMain(name,price)
    cartMain.push(cartItem)
    localStorage.cartItems = JSON.stringify(cartMain)
    console.log(localStorage.cartItems)
    num++
    $('#cartCounter').text(num)

}