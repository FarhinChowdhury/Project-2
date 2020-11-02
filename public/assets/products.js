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
                    <a href="#" class="btn btn-primary mt-2">Buy Now</a>

                </div>
            </div>
            `
            )
        })
    });
});