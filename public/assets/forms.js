$(document).ready(function() {
    // Gets an optional query string from our url (i.e. ?post_id=23)
    // var url = window.location.search;
    // var postId;
    // // Sets a flag for whether or not we're updating a post to be false initially
    // var updating = false;

    // If we have this section in our url, we pull out the post id from the url
    // In localhost:8080/cms?post_id=1, postId is 1
    // if (url.indexOf('?post_id=') !== -1) {
    //     postId = url.split('=')[1];
    //     getPostData(postId);
    // }

    function submitProduct(Post) {
        console.log('submitting: ',Post)
        $.post('/api/posts', Post, function() {
            console.log('Adding product to database...')
            // window.location.href = '/product';
        });
    }

    var productInput = $('#product');
    var descriptionInput = $('#desc');
    var categoryInput = $('#category')
    var startingBidInput = $('#startingBid')
    var stockInput = $('#stock')
    var imageInput = $('#uploadImage')
    var productForm = $('.submit');
    var postCategorySelect = $('#category');
    // Adding an event listener for when the form is submitted
    $(productForm).on('click', function handleFormSubmit(event) {
        event.preventDefault();
        // console.log((productInput.val()),descriptionInput.val(),categoryInput.val(),startingBidInput.val(),imageInput.val())
        // Wont submit the post if we are missing a body or a title
        if (!productInput.val().trim() || !descriptionInput.val().trim() || !categoryInput.val() || !startingBidInput.val() || !imageInput.val() || !stockInput.val()) {
            console.log('Unable to submit')
            return;
        }
        // Constructing a newPost object to hand to the database
        var newProduct = {
            name: productInput.val().trim(),
            desc: descriptionInput.val().trim(),
            price: startingBidInput.val().trim(),
            stock: stockInput.val().trim(),
            category: postCategorySelect.val().trim(),

        };

        console.log(newProduct);
        submitProduct(newProduct)
    });

    // Submits a new post and brings user to blog page upon completion
});
