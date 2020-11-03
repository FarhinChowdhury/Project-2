let cartItems = JSON.parse(localStorage.cartItems)
console.log(cartItems)
total = 0
cartItems.forEach(function(el,i){
    total+=el.price
    $('#cartBody').append(`
    <tr>
    <th scope="row">${i+1}</th>
    <td>${el.name}</td>
    <td>$${el.price.toFixed(2)}</td>
    </tr>

    `)
})
$('#cartTotal').append(`$${total.toFixed(2)}`)