// add to local Storage
// if item in localStorage change navbar for function

function renderNav() {
    $('.navbar').empty()

    const navbar = $('.navbar')
    let userState = localStorage.getItem('email')
    if (userState){
        let newLocal = `
            <a href="/" class="navbar-brand mb-0 h1">Fandomzzz</a>
            <div class="nav-search-field ">
                <div class="input-group">
                    <input id = "searchBox" type="text" class="form-control" placeholder="Search Item" size="50" maxlength="300" aria-label="Search for anything" placeholder="Search for anything">
                    <button class="input-group-text" id="searchBtn">
                    <i class="fas fa-search"></i>
                </div>
            </div>
            <ul class="nav justify-content-end">
                <li class="nav-item">
                    <a class="nav-link" href="/bids">All Products</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/posts">Add Product</a>
                </li>
                <li class="nav-item">
                    Welcome, ${userState}
                </li>
                <li class="nav-item" id = "cart">
                    <a href="./cart.html" class="nav-link navbar-link-2 waves-effect">
                        <span id = "cartCounter"class="badge badge-pill red">0</span>
                        <i class="fas fa-shopping-cart pl-0"></i>
                    </a>
                </li>
                <li class="nav-item pl-2 mb-2 mb-md-0">
                    <a href="#" class="nav-link navbar-link-2 waves-effect">
                        <i class="fas fa-user-circle"></i>
                    </a>
                </li>
            </ul>`
        navbar.html(newLocal)
    } else {
        console.log('User is not logged in')
    }
}
renderNav()