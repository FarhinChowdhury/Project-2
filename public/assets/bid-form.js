let imageData;
var productInput = $('#product');
var descriptionInput = $('#desc');
var categoryInput = $('#category');
var startingBidInput = $('#startingBid');
var stockInput = $('#stock');
var imageInput = $('#imageFile');
var productForm = $('.submit');
var postCategorySelect = $('#category');


async function apiCall( url, method='get', data={} ){
    method = method.toLowerCase()
    let settings = { method }

    // for formData we must NOT set content-type, let system do it
    const isFormData = (typeof data)==='string'
    if( !isFormData ) {
        settings.headers = { 'Content-Type': 'application/json' }
    }

    // only attach the body for put/post
    if( method === 'post' || method === 'put' ) {
        if( isFormData ){
            //* gather form data (esp. if attached media)
            //! each entry to be attached must have a valid **name** attribute
            settings.body = new FormData( document.querySelector(`${data}`) )
        } else {
            settings.body = JSON.stringify( data )
        }
    }

    const result = await fetch( url,settings ).then( res=>res.json() )

    return result
}

async function uploadMedia( event ){
    event.preventDefault()

    //* because we are using the built-in browser form-builder, we need valid
    //! **name** attributes - for ease we give same values as the id's
    const uploadResponse = await apiCall( '/api/upload', 'post', '#mediaForm' )
    console.log( '[uploadResponse] ', uploadResponse )

    if( uploadResponse.status ){
        // clear the data
        // document.querySelector('#imageUrl').value = ''
        $('#productImage').attr('src',uploadResponse.imageUrl)
        imageData = uploadResponse.imageUrl
        console.log('ImageData: ', imageData)
        confirmNewProduct()
        // refresh the list
    }
}

function submitProduct(Post) {
    console.log('submitting: ', Post);
    $.post('/api/posts', Post, function () {
        console.log('Adding product to database...');
        // window.location.href = '/product';
    });

}

function confirmNewProduct() {

    if (
        !productInput.val().trim() ||
            !descriptionInput.val().trim() ||
            !categoryInput.val() ||
            !startingBidInput.val() ||
            !imageInput.val() ||
            !stockInput.val()
    ) {
        console.log('Unable to submit');
        return;
    }
    console.log('IMAGE INPUT', imageInput)
    // Constructing a newPost object to hand to the database
    var newProduct = {
        name: productInput.val().trim(),
        desc: descriptionInput.val().trim(),
        price: startingBidInput.val().trim(),
        stock: stockInput.val().trim(),
        category: postCategorySelect.val().trim(),
        image: imageData
    };

    console.log(newProduct);

    $('#productName').text(newProduct.name)
    $('#productDesc').text(newProduct.desc)
    $('#productStock').text(`Stock: ${newProduct.stock}`)
    $('#productCat').text(newProduct.category)
    $('#productBid').text(`Starting Bid: ${newProduct.price}`)
    // $('#productImage').attr('src',data.image)
    $('#myModal').modal({show:true})
    $('#saveBtn').on('click', submitProduct(newProduct))

}



// Adding an event listener for when the form is submitted
// Submits a new post and brings user to blog page upon completion


function validateFile() {

    const fileName = $('#uploadImage').val();
    const allowedExtensions = new Array('jpg', 'png');
    const fileExtension = fileName.split('.').pop().toLowerCase(); // split the filename by dot(.), and pop the last element from the array which will give you the extension as well. If there will be no extension then it will return the filename.

    for (let i = 0; i <= allowedExtensions.length; i++) {
        if (allowedExtensions[i] === fileExtension) {
            return true; // valid file type
        }
    }
    return false;
}

function validateForm() {

    event.preventDefault();

    // variables for form values
    const name = $('#product').val();
    const desc = $('#desc').val();
    const selection = $('#category').val();
    let bid = $('#startingBid').val();

    if (name.trim() === '' || name.length > 50) {
        alert('Please enter a product name of no more than 50 characters.')
        return false;
    }

    if (desc.trim() === '' || desc.length > 200) {
        alert('Please enter a description of no more than 200 characters.')
        return false;
    }

    if (selection === 'Select Category') {
        alert('Please choose a category.');
        return false;
    }

    if (bid.trim() === '' || isNaN(bid)) {
        alert('Please enter a number.');
        return false;
    }
    bid = parseFloat(bid).toFixed(2); // parse float to two decimal places

    if (validateFile() === false) {
        alert('Please upload a .jpg or .png file.');
        return false;
    }
    return true; // form submitted
}