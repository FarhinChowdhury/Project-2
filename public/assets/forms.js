$(document).ready(function () {

    function submitProduct(Post) {
        console.log('submitting: ', Post);
        $.post('/api/posts', Post, function () {
            console.log('Adding product to database...');
            // window.location.href = '/product';
        });
    }

    function confirmNewProduct(data) {
        $('#productName').text(data.name)
        $('#productDesc').text(data.desc)
        $('#productStock').text(`Stock: ${data.stock}`)
        $('#productCat').text(data.category)
        $('#productBid').text(`Starting Bid: ${data.price}`)
        $('#productImage').attr('src',data.image)
        $('#myModal').modal({show:true})
        $('#saveBtn').on('click', submitProduct(data))
    }



    var productInput = $('#product');
    var descriptionInput = $('#desc');
    var categoryInput = $('#category');
    var startingBidInput = $('#startingBid');
    var stockInput = $('#stock');
    var imageInput = $('#uploadImage');
    var productForm = $('.submit');
    var postCategorySelect = $('#category');
    // Adding an event listener for when the form is submitted
    $(productForm).on('click', function handleFormSubmit(event) {
        event.preventDefault();
        // console.log((productInput.val()),descriptionInput.val(),categoryInput.val(),startingBidInput.val(),imageInput.val())
        // Wont submit the post if we are missing a body or a title
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
        // Constructing a newPost object to hand to the database
        var newProduct = {
            name: productInput.val().trim(),
            desc: descriptionInput.val().trim(),
            price: startingBidInput.val().trim(),
            stock: stockInput.val().trim(),
            category: postCategorySelect.val().trim(),
            image: imageInput.val()
        };

        console.log(newProduct);
        confirmNewProduct(newProduct);
    });

    // Submits a new post and brings user to blog page upon completion
});
