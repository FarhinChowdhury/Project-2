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
});