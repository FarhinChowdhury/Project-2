$(document).ready(function() {
    function getProduct(Post) {
        console.log('submitting: ',Post)
        $.get(`/api/posts/${Post}`, Post, function(res) {
            console.log('Searching product database...')
            // window.location.href = '/product';
            if(res.length<1){
                console.log('No results found...')
            }
            console.log('RESPONSE:',res)
        });
    }
    var searchInput = $('#searchBox')
    var searchBtn = $('#searchBtn')
    // Adding an event listener for when the form is submitted
    $(searchBtn).on('click', function handleFormSearch(event) {
        event.preventDefault();
        console.log('click', searchInput.val())
        if (!searchInput.val()) {
            console.log('Please enter your search in the search box.')
            return;
        }
        var search = searchInput.val().trim()
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
        res.forEach(function(el){
            $('#featuredCards').append(`
            <div class="card m-2 p-0" style="width: 16rem;">
                <img class="card-img-top" id="productImage" src="${el.image}" alt="Card image cap" >
                <div class="card-body">
                    <h5 class="card-title m-0" id="productName">${el.name}</h5>
                    <p class="card-text m-0" id="productDesc">${el.desc}</p>
                    <p class="card-text m-0" id="productStock">Stock: ${el.stock}</p>
                    <p class="card-text m-0" id="productCat">${el.category}</p>
                    <p class="card-text m-0" id="productBid">Starting Bid: ${el.price.toFixed(2)}</p>
                    <a href="#" class="btn btn-primary m-0 mt-2">Make a Bid</a>
                    <a href="#" class="btn btn-primary mt-2">Buy Now</a>

                </div>
            </div>
            `
            )
        })
    });

});