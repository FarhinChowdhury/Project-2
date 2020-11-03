
const main = function(){
    let cartItems = JSON.parse(localStorage.cartItems)
    console.log(cartItems)
    total = 0
    let id = 1
    $('#cartBody').empty()
    cartItems.forEach(function(el,i){
        total+=el.price
        $('#cartBody').append(`
        <tr class="${id}">
        <th scope="row">${i+1}</th>
        <td>${el.name}</td>
        <td>$${el.price.toFixed(2)}</td>
        <td><button class="btn btn-sm btn-outline-danger " onClick="deleteCart('${el.name}')"><i class="far fa-trash-alt"></i></button></td>
        </tr>
        `)
        id++
    })
    $('#cartTotal').html(`$${total.toFixed(2)}`)
}
main()

function deleteCart(name){
    let myCart = JSON.parse(localStorage.cartItems)
    myCart = myCart.filter(item => item.name !== name )
    localStorage.setItem('cartItems', JSON.stringify(myCart))
    // var lineItem = $('.id')
    // console.log(lineItem)
    // lineItem.remove()
    //localStorage.removeItem(name)
    main()
}