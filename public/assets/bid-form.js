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